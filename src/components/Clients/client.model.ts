import { Schema, model } from "mongoose";
import { IClient, IClientModel } from "./client.interface";

export const ClientSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    lastName: String,
    mobileNo: {
      type: Number,
      required: true,
    },
    emailId: String,
    role: {
      type: String,
      enum: ["admin", "member", "guest"],
    },
    address: {
      type: String,
      required: true,
    },
    uid: {
      type: String,
      required: true,
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

ClientSchema.statics = {
  getAllAssignedClients: async function (matchQuery) {
    try {
      const assignedClients = await this.find(matchQuery);
      // .populate("industryInfo", "name")
      // .populate("subIndustryInfo", "name code");
      return assignedClients;
    } catch (err) {
      throw err;
    }
  },
  getClientInfo: async function (matchQuery) {
    try {
      const clientDoc = await this.findById(matchQuery);

      return clientDoc;
    } catch (err) {
      throw err;
    }
  },
};

const Client: IClientModel = model<IClient, IClientModel>(
  "Client",
  ClientSchema
);
export default Client;
