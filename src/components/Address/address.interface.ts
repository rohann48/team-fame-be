import { Document, Model } from "mongoose";
import { IClient } from "../Clients/client.interface";

interface IAddressSchema extends Document {
  _id: any;
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  pincode: number;
  state: string;
  city: string;
  landmark?: string;
  alternatePhone?: number;
  clientId: IClient["_id"];
}

//instance methods, virtuals
interface IAddressBase extends IAddressSchema {}

// document with string reference
export interface IAddress extends IAddressBase {}

// document with reference populated
export interface IAddressPopulated extends IAddress {}

export interface IAddressModel extends Model<IAddress> {
  addAddress(data: NewAddressParams): Promise<IAddress>;
  getAddressList(matchQuery: object): Promise<Array<IAddress>>;
  getAddressById(id: IAddress["_id"]): Promise<IAddress>;
  deleteAddressById(id: IAddress["_id"]): Promise<IAddress>;
}

export interface NewAddressParams {
  addressLine1: IAddress["addressLine1"];
  addressLine2?: IAddress["addressLine2"];
  addressLine3?: IAddress["addressLine3"];
  pincode: IAddress["pincode"];
  state: IAddress["state"];
  city: IAddress["city"];
  landmark?: IAddress["landmark"];
  alternatePhone?: IAddress["alternatePhone"];
  clientId: IAddress["clientId"];
}
