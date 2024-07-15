import { Schema, model } from "mongoose";
import { IOffer, IOfferModel } from "./offer.interface";

export const OfferSchema: Schema = new Schema(
  {
    refferalCodes: {
      type: [String],
      index: true,
    },
    appliedCodes: {
      type: [String],
      index: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    toObject: { virtuals: true },
  }
);

OfferSchema.statics = {
  addOfferRefferalCode: async function (data) {
    try {
      const refferal = new Offers(data);
      const refferalDoc = await refferal.save();
      return refferalDoc;
    } catch (err) {
      throw err;
    }
  },
  getRefferalCodeList: async function (matchQuery) {
    try {
      const refferalDoc = await this.find(matchQuery);
      return refferalDoc;
    } catch (err) {
      throw err;
    }
  },

  updateOfferRefferalById: async function (docId, data) {
    try {
      const refferalDoc = await this.findByIdAndUpdate(docId, data, {
        new: true,
      });
      return refferalDoc;
    } catch (err) {
      throw err;
    }
  },
};
const Offers: IOfferModel = model<IOffer, IOfferModel>("Offers", OfferSchema);
export default Offers;
