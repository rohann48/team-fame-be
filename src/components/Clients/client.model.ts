import { Schema, model } from "mongoose";
import { IClient, IClientModel } from "./client.interface";
import jwt from "jsonwebtoken";

export const ClientSchema: Schema = new Schema(
  {
    avatar: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
    lastName: String,
    contactNo: {
      type: Number,
      required: true,
    },
    emailId: {
      type: String,
      required: "Email is required",
      match: [
        /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
        "Please fill a valid email address",
      ],
    },
    role: {
      type: String,
      default: "member",
      enum: ["admin", "member", "guest"],
    },
    addressId: {
      type: Schema.Types.ObjectId,
      ref: "Address",
    },
    uid: {
      type: String,
    },
    password: {
      type: String,
      minlength: 8,
      maxlength: 255,
    },
    confirmPassword: {
      type: String,
      minlength: 8,
      maxlength: 255,
    },
    referralCode: String,
    membership: {
      type: Boolean,
      default: false,
    },
    cartId: {
      type: Schema.Types.ObjectId,
      ref: "Cart",
    },
    goldSchemeId: {
      type: Schema.Types.ObjectId,
      ref: "GoldScheme",
    },
    shopVoucher: {
      invitedRefferal: String,
    },
    isSuperAdmin: {
      type: Boolean,
      default: false,
    },
    nominee: String,
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
  generateAuthToken: async function (userData) {
    const jwtToken = await jwt.sign(
      {
        _id: userData._id,
        name: userData.name,
        role: userData.role,
        email: userData.email,
        contactNo: userData.contactNo,
        membership: userData.membership,
        goldSchemeId: userData.goldSchemeId,
        // shopVoucher: userData.shopVoucher,
      },
      "fame_jwtPrivateKey",
      // process.env.JWTPRIVATEKEY
      { expiresIn: "1d" }
    );
    return jwtToken;
  },
  getClientsByQuery: async function (matchQuery, selectQuery) {
    try {
      const assignedClients = await this.find(matchQuery).select(selectQuery);

      return assignedClients;
    } catch (err) {
      throw err;
    }
  },
  addClient: async function (userData) {
    try {
      const clientDoc = new Client(userData);
      const doc = await clientDoc.save();
      return doc;
    } catch (err) {
      console.log(err);

      throw err;
    }
  },
  getClientInfoById: async function (clientId) {
    try {
      const clientDoc = await this.findById(clientId).select(
        "-password -confirmPassword"
      );
      return clientDoc;
    } catch (err) {
      throw err;
    }
  },

  getOneClientInfo: async function (matchQuery = {}, selectQuery = {}) {
    try {
      const clientDoc = await this.findOne(matchQuery).select(selectQuery);
      return clientDoc;
    } catch (err) {
      throw err;
    }
  },

  updateClientInfoById: async function (clientId, data) {
    try {
      const client = await this.findByIdAndUpdate(
        clientId,
        { $set: data },
        { new: true }
      );
      return client;
    } catch (err) {
      throw err;
    }
  },

  deleteClientById: async function (aboutId) {
    try {
      const clientDoc = await this.findByIdAndDelete(aboutId);
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
