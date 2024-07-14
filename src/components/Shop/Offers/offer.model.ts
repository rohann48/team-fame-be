import { Schema, model } from "mongoose";
import { IOffer, IOfferModel } from "./offer.interface";

export const OfferSchema: Schema = new Schema();

OfferSchema.statics = {};
const Offers: IOfferModel = model<IOffer, IOfferModel>("Offers", OfferSchema);
export default Offers;
