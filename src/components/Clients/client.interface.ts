import { Document, Model } from "mongoose";

interface IClientSchema extends Document {
  _id: any;
  avatar: string;
  name: string;
  lastName: string;
  contactNo: number;
  emailId: string;
  role: "admin" | "member" | "guest";
  address?: string;
  password: string;
  confirmPassword: string;
  referralCode: string;
  membership: boolean;
  shopVoucher: {
    invitedRefferal: string;
  };
  isSuperAdmin: boolean;
  nominee?: string;
}

//instance methods, virtuals
interface IClientBase extends IClientSchema {}

// document with string reference
export interface IClient extends IClientBase {}

// document with reference populated
export interface IClientPopulated extends IClient {}

export interface IClientModel extends Model<IClient> {
  addClient(userData);
  getClientsByQuery(matchQuery, selectQuery);
  getClientInfoById(clientId: IClient["_id"]): Promise<IClient>;
  updateClientInfoById(clientId: IClient["_id"], data);
  generateAuthToken(userData);
  deleteClientById(clientId: IClient["_id"]);
  getOneClientInfo(matchQuery: object, selectQuery: object);
}

export interface NewClientDataParams {
  avatar?: IClient["avatar"];
  name: IClient["name"];
  lastName: IClient["lastName"];
  contactNo: IClient["contactNo"];
  emailId: IClient["emailId"];
  password: IClient["password"];
  confirmPassword: IClient["confirmPassword"];
  shopVoucher: IClient["shopVoucher"]["invitedRefferal"];
  nominee?: IClient["nominee"];
}
