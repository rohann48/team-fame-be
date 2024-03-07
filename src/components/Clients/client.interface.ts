import { Document, Model } from "mongoose";

interface IClientSchema extends Document {
  _id: any;
  name: string;
  lastName: string;
  mobileNo: number;
  emailId: string;
  role: "admin" | "member" | "guest";
  address: string;
}

//instance methods, virtuals
interface IClientBase extends IClientSchema {}

// document with string reference
export interface IClient extends IClientBase {}

// document with reference populated
export interface IClientPopulated extends IClient {}

export interface IClientModel extends Model<IClient> {
  getAllAssignedClients(matchQuery);
  getClientInfo(matchQuery);
}
