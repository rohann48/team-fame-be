import { Document, Model } from "mongoose";
import { IClient } from "../Clients/client.interface";

interface investmentSchema {
  year: number;
  month: number;
  date: Date;
  amount: number;
  type: "FD" | "NonRefundable";
  paymentId?: string;
  paymentStatus?: string;
  razorOrderId?: string;
}

interface IGoldSchemeSchema extends Document {
  _id: any;
  period: number;
  clientId: IClient["_id"];
  startDate: Date;
  endDate: Date;
  investments: Array<investmentSchema>;
}

//instance methods, virtuals
interface IGoldSchemeBase extends IGoldSchemeSchema {}

// document with string reference
export interface IGoldScheme extends IGoldSchemeBase {}

// document with reference populated
export interface IGoldSchemePopulated extends IGoldScheme {}

export interface IGoldSchemeModel extends Model<IGoldScheme> {
  addGoldScheme(data: NewGoldSchemeParams): Promise<IGoldScheme>;
  getGoldSchemeList(matchQuery: object): Promise<IGoldScheme>;
  getGoldSchemeById(id: IGoldScheme["_id"]): Promise<IGoldScheme>;
  updateSchemeInvestmentById(
    id: IGoldScheme["_id"],
    data
  ): Promise<IGoldScheme>;
  updateSchemeById(docId: IGoldScheme["_id"], data);
  getGoldSchemeByQuery(matchQuery: object);
  getGoldSchemeAllList(matchQuery: object);
  updateInvestmentById(schemeId, razorpayId, modifiedData);
}

export interface NewGoldSchemeParams {
  clientId: IGoldScheme["clientId"];
  period: IGoldScheme["period"];
  startDate: IGoldScheme["startDate"];
  endDate: IGoldScheme["endDate"];
}

export interface UpdateGoldSchemeParams {
  clientId: IGoldScheme["clientId"];
  period: IGoldScheme["period"];
  startDate: IGoldScheme["startDate"];
  endDate: IGoldScheme["endDate"];
}

export interface UpdateGoldInvestmentParams {
  clientId: IGoldScheme["clientId"];
  year: number;
  month: number;
  date: Date;
  amount: number;
  razorOrderId: string;
}
export interface IManualSchemData {
  mobileNumber: string;
  investmentAmount: string;
  startDate: string;
  endDate?: string;
  period?: string;
  schemeType: string;
}
