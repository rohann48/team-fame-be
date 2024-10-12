import { ClientService } from "../Clients/client.service";
import OrderDetails from "./orderDetails.model";
import { OfferService } from "../Shop/Offers/offer.service";
import { NewOrderDetailParams } from "./orderDetails.interface";

export class OrderDetailsService {
  async addOrderDetails(newDetails: NewOrderDetailParams) {
    const newData: any = {
      clientId: newDetails.clientId,
      name: newDetails.name,
      mobile: newDetails.mobile,
      address: {
        addressLine1: newDetails.addressLine1,
        ...(newDetails?.addressLine2 && {
          addressLine2: newDetails.addressLine2,
        }),
        ...(newDetails?.addressLine3 && {
          addressLine3: newDetails.addressLine3,
        }),
      },
      pincode: newDetails.pincode,
      amount: newDetails.amount,
      paymentMode: newDetails.paymentMode,
      orderDetails: newDetails.orderDetails,
    };
    const data = await OrderDetails.addOrderDetails(newData);
    new ClientService().updateClientMembership(newDetails.clientId);
    if (newDetails?.code) {
      new OfferService().updateAppliedCode(newDetails.code);
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
}
