import { Schema, model } from "mongoose";
import { IAddress, IAddressModel } from "./address.interface";

export const AddressSchema: Schema = new Schema(
  {
    addressLine1: String,
    addressLine2: String,
    addressLine3: String,
    pincode: Number,
    state: String,
    city: String,
    landmark: String,
    alternatePhone: Number,
    clientId: {
      type: Schema.Types.ObjectId,
      ref: "Client",
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

AddressSchema.statics = {
  addAddress: async function (data) {
    try {
      const address = new Address(data);
      const doc = await address.save();
      return doc;
    } catch (err) {
      throw err;
    }
  },
  getAddressList: async function (matchQuery) {
    try {
      const testimonials = await this.find(matchQuery);
      return testimonials;
    } catch (err) {
      throw err;
    }
  },

  getAddressById: async function (id) {
    try {
      const address = await this.findById(id);
      return address;
    } catch (err) {
      throw err;
    }
  },

  deleteAddressById: async function (testId) {
    try {
      const doc = await this.findByIdAndDelete(testId);
      return doc;
    } catch (err) {
      throw err;
    }
  },
};

const Address: IAddressModel = model<IAddress, IAddressModel>(
  "Address",
  AddressSchema
);
export default Address;
