import { Document, Model } from "mongoose";

interface IOfferSchema extends Document {
  refferalCodes: string[];
  appliedCodes: string[];
}

//instance methods, virtuals
interface IOfferBase extends IOfferSchema {}

// document with string reference
export interface IOffer extends IOfferBase {}

// document with reference populated
export interface IOfferPopulated extends IOffer {}

export interface IOfferModel extends Model<IOffer> {
  addOfferRefferalCode(data: NewOfferParams): Promise<IOffer>;
  getRefferalCodeList(matchQuery: object): Promise<Array<IOffer>>;
  updateOfferRefferalById(OfferId: IOffer["_id"], data): Promise<IOffer>;
}

export interface NewOfferParams {}
