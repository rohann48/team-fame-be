import { Document, Model } from "mongoose";

interface IOfferSchema extends Document {
  offers: string[];
}

//instance methods, virtuals
interface IOfferBase extends IOfferSchema {}

// document with string reference
export interface IOffer extends IOfferBase {}

// document with reference populated
export interface IOfferPopulated extends IOffer {}

export interface IOfferModel extends Model<IOffer> {
  addOffer(data: NewOfferParams): Promise<IOffer>;
  getOfferList(matchQuery: object): Promise<Array<IOffer>>;
  getOfferById(id: IOffer["_id"]): Promise<IOffer>;
  updateOfferById(OfferId: IOffer["_id"], data): Promise<IOffer>;
}

export interface NewOfferParams {}
