import { Document, Model } from "mongoose";
import { IClient } from "../Clients/client.interface";

interface IOrderDetailSchema extends Document {
  _id: any;
  clientId: IClient["_id"];
  name: string;
  mobile: number;
  address: {
    addressLine1: string;
    addressLine2?: string;
    addressLine3?: string;
  };
  pincode: number;
  amount: number;
  paymentMode: string;
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
}

export interface NewOrderDetailParams {
  clientId: IClient["_id"];
  name: IOrderDetail["name"];
  mobile: IOrderDetail["mobile"];
  pincode: IOrderDetail["pincode"];
  addressLine1: IOrderDetail["address"]["addressLine1"];
  addressLine2?: IOrderDetail["address"]["addressLine2"];
  addressLine3?: IOrderDetail["address"]["addressLine3"];
  amount: IOrderDetail["amount"];
  paymentMode: IOrderDetail["paymentMode"];
  code?: string;
  orderDetails: IOrderDetail["orderDetails"];
}
