import {
  orderDescription,
  orderStatus,
} from "../../common/constants/status.enum";
import { ClientService } from "../Clients/client.service";
import { EmailService } from "../Email/Email.service";
import { OrderDetailsService } from "../OrderDetails/orderDetails.service";
import { OfferService } from "../Shop/Offers/offer.service";
import Razorpay from "razorpay";
import { validateWebhookSignature } from "razorpay/dist/utils/razorpay-utils";

const razorpay = new Razorpay({
  key_id: "rzp_test_8UqYGrFyKHxYJz",
  key_secret: "WUbKN0DYOagsKkIHchm3HRvM",
});

export class PaymentDetailsService {
  async paymentDetails(data) {
    try {
      const { amount, currency, receipt, notes } = data;
      const options = {
        amount: amount * 100, // Convert amount to paise
        currency,
        receipt,
        notes,
      };

      const order = await razorpay.orders.create(options);

      // Read current orders, add new order, and write back to the file
      const orders = [];
      orders.push({
        order_id: order.id,
        amount: order.amount,
        currency: order.currency,
        receipt: order.receipt,
        status: "created",
      });
      return order;
    } catch (error: any) {
      throw error;
    }
  }
  async verifyPayment(data) {
    console.log("data", data);

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      amount,
    } = data;

    const secret = "WUbKN0DYOagsKkIHchm3HRvM";
    const body = razorpay_order_id + "|" + razorpay_payment_id;

    try {
      const isValidSignature = validateWebhookSignature(
        body,
        razorpay_signature,
        secret
      );
      const orderInfo =
        await new OrderDetailsService().getOrderDetailsByQueryAndPopulate({
          razorOrderId: razorpay_order_id,
        });
      if (isValidSignature) {
        // Update the order with payment details
        // const orders = readData();
        // const order = orders.find((o) => o.order_id === razorpay_order_id);
        // if (order) {
        //   order.status = "paid";
        //   order.payment_id = razorpay_payment_id;
        //   writeData(orders);
        // }

        const emailData = {
          to: [orderInfo?.["clientInfo"]?.emailId],
          subject: "Payment Success",
          message: `You've successfully placed the order. Your payment of ${amount} was successful. Order ID: ${razorpay_order_id} and Payment ID: ${razorpay_payment_id}`,
        };

        console.log("Payment verification successful");
        orderInfo.paymentStatus = "success";
        orderInfo.paymentId = razorpay_payment_id;
        orderInfo.status = orderStatus.ORDERPLACED;
        orderInfo.statusDescription = orderDescription.ORDERPLACED;
        const mail = await new EmailService().sendEmail(emailData);
        orderInfo.save();
        return true;
        // res.status(200).json({ status: "ok" });
      } else {
        orderInfo.paymentStatus = "failed";
        orderInfo.paymentId = razorpay_payment_id;
        orderInfo.status = orderStatus.FAILED;
        orderInfo.statusDescription = orderDescription.FAILED;
        orderInfo.save();

        console.log("Payment verification failed");
        throw new Error("verification_failed");
      }
    } catch (error) {
      console.error(error);
      throw new Error("Error verifying payment");
    }
  }
  //   async getOrderDetailById(docId) {
  //     const res = await OrderDetails.getOrderDetailById(docId);
  //     return res;
  //   }
}
