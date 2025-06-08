import { ClientService } from "../Clients/client.service";
import OrderDetails from "./orderDetails.model";
import { OfferService } from "../Shop/Offers/offer.service";
import { NewOrderDetailParams } from "./orderDetails.interface";
import { EmailService } from "../Email/Email.service";
import {
  orderDescription,
  orderStatus,
} from "../../common/constants/status.enum";

export class OrderDetailsService {
  async addOrderDetails(newDetails: NewOrderDetailParams) {
    const newData: any = {
      clientId: newDetails.clientId,
      address: {
        name: newDetails.name,
        mobile: newDetails.mobile,
        addressLine1: newDetails.addressLine1,
        ...(newDetails?.addressLine2 && {
          addressLine2: newDetails.addressLine2,
        }),
        ...(newDetails?.addressLine3 && {
          addressLine3: newDetails.addressLine3,
        }),
        pincode: newDetails.pincode,
      },
      amount: newDetails.amount,
      paymentMode: newDetails.paymentMode,
      orderDetails: newDetails.orderDetails,
      razorOrderId: newDetails.razorOrderId,
      date: newDetails.date,
      paymentStatus: "pending",
      status: orderStatus.ORDERPLACED,
      statusDescription: orderDescription.ORDERPLACED,
    };
    const data = await OrderDetails.addOrderDetails(newData);
    new ClientService().updateClientMembership(newDetails.clientId);
    if (newDetails?.code) {
      new OfferService().updateAppliedCode(newDetails.code);
    }

    if (newDetails.paymentMode === "cod") {
      const clientInfo = await new ClientService().getClientInfoById(
        newDetails.clientId
      );
      const emailData = {
        to: [clientInfo.emailId],
        subject: `Cash On Delivery - ${newDetails.razorOrderId}`,
        message: `Your cash on delivery of ₹${newDetails.amount} is placed successfully. Order ID: ${newDetails.razorOrderId}`,
      };
      // const mail = await new EmailService().sendEmail(emailData);
    }
    return data;
  }

  async getOrderDetailList(matchQuery) {
    const data = await OrderDetails.getOrderDetailList(matchQuery);
    return data;
  }

  async getOrderDetailsByQuery(matchQuery) {
    const data = await OrderDetails.getOrderDetailsByQuery(matchQuery);
    return data;
  }

  async getOrderDetailById(docId) {
    const res = await OrderDetails.getOrderDetailById(docId);
    return res;
  }

  async getOrderDetailsByQueryAndPopulate(matchQuery) {
    const res = await OrderDetails.getOrderDetailsByQueryAndPopulate(
      matchQuery
    );
    return res;
  }

  async updateOrderStatusById(orederId, currStatus) {
    let status, statusDescription;
    if (currStatus === orderStatus.ORDERPLACED) {
      status = orderStatus.ORDERPLACED;
      statusDescription = orderDescription.ORDERPLACED;
    } else if (currStatus === orderStatus.SHIPPED) {
      status = orderStatus.SHIPPED;
      statusDescription = orderDescription.SHIPPED;
    } else if (currStatus === orderStatus.DELIVERED) {
      status = orderStatus.DELIVERED;
      statusDescription = orderDescription.DELIVERED;
    } else if (currStatus === orderStatus.OUTFORDELIVERY) {
      status = orderStatus.OUTFORDELIVERY;
      statusDescription = orderDescription.OUTFORDELIVERY;
    } else if (currStatus === orderStatus.DELAYED) {
      status = orderStatus.DELAYED;
      statusDescription = orderDescription.DELAYED;
    } else if (currStatus === orderStatus.FAILED) {
      status = orderStatus.FAILED;
      statusDescription = orderDescription.FAILED;
    } else {
      throw new Error("Invalid Status");
    }
    const data = {
      $set: {
        status: status,
        statusDescription: statusDescription,
      },
    };
    const res = await OrderDetails.updateOrderStatusById(orederId, data);
    return res;
  }
}
