import { Document, Model } from "mongoose";
import { IClient } from "../Clients/client.interface";

interface IOrderDetailSchema extends Document {
  _id: any;
  clientId: IClient["_id"];
  address: {
    name: string;
    mobile: number;
    addressLine1: string;
    addressLine2?: string;
    addressLine3?: string;
    pincode: number;
  };
  amount: number;
  paymentMode: string;
  date: Date;
  razorOrderId: string;
  paymentId: string;
  paymentStatus: string;
  status: string;
  statusDescription: string;
  orderDetails: Array<{
    name: string;
    price: number;
    quantity: number;
    offers: {
      cashback: number;
    };
  }>;
}

//instance methods, virtuals
interface IOrderDetailBase extends IOrderDetailSchema {}

// document with string reference
export interface IOrderDetail extends IOrderDetailBase {}

// document with reference populated
export interface IOrderDetailPopulated extends IOrderDetail {}

export interface IOrderDetailModel extends Model<IOrderDetail> {
  addOrderDetails(data: NewOrderDetailParams): Promise<IOrderDetail>;
  getOrderDetailList(matchQuery: object): Promise<Array<IOrderDetail>>;
  getOrderDetailById(id: IOrderDetail["_id"]): Promise<IOrderDetail>;
  getOrderDetailsByQuery(matchQuery: object);
  getOrderDetailsByQueryAndPopulate(matchQuery: object): Promise<IOrderDetail>;
  updateOrderStatusById(
    id: IOrderDetail["_id"],
    modefiedData
  ): Promise<IOrderDetail>;
}

export interface NewOrderDetailParams {
  clientId: IClient["_id"];
  name: IOrderDetail["address"]["name"];
  mobile: IOrderDetail["address"]["mobile"];
  pincode: IOrderDetail["address"]["pincode"];
  addressLine1: IOrderDetail["address"]["addressLine1"];
  addressLine2?: IOrderDetail["address"]["addressLine2"];
  addressLine3?: IOrderDetail["address"]["addressLine3"];
  amount: IOrderDetail["amount"];
  date: IOrderDetail["date"];
  paymentMode: IOrderDetail["paymentMode"];
  code?: string;
  orderDetails: IOrderDetail["orderDetails"];
  razorOrderId: IOrderDetail["razorOrderId"];
  paymentStatus?: IOrderDetail["paymentStatus"];
  paymentId?: IOrderDetail["paymentId"];
  status?: IOrderDetail["status"];
  statusDescription?: IOrderDetail["statusDescription"];
}
