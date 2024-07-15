import { Schema, model } from "mongoose";
import { IOrderDetail, IOrderDetailModel } from "./orderDetails.interface";

const investmentSchema = {
  year: Number,
  month: Number,
  date: Date,
  amount: Number,
};

const OrderDetailSchema: Schema = new Schema(
  {
    clientId: {
      type: Schema.Types.ObjectId,
      ref: "Client",
    },
    name: String,
    mobile: Number,
    address: {
      addressLine1: String,
      addressLine2: String,
      addressLine3: String,
    },
    pincode: Number,
    amount: Number,
    paymentMode: String,
    date: {
      type: Date,
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

OrderDetailSchema.statics = {
  addOrderDetails: async function (data) {
    try {
      const orderDetail = new OrderDetail(data);
      const orderDetailDoc = await orderDetail.save();
      return orderDetailDoc;
    } catch (err) {
      throw err;
    }
  },
  getOrderDetailList: async function (matchQuery = {}) {
    try {
      const res = await this.find(matchQuery);
      return res;
    } catch (err) {
      throw err;
    }
  },

  getOrderDetailById: async function (docId) {
    try {
      const res = await this.findById(docId);
      return res;
    } catch (err) {
      throw err;
    }
  },

  getOrderDetailsByQuery: async function (matchQuery) {
    try {
      const res = await this.findOne(matchQuery);
      return res;
    } catch (err) {
      throw err;
    }
  },
};

const OrderDetail: IOrderDetailModel = model<IOrderDetail, IOrderDetailModel>(
  "OrderDetail",
  OrderDetailSchema
);
export default OrderDetail;
