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
    address: {
      name: String,
      mobile: Number,
      addressLine1: String,
      addressLine2: String,
      addressLine3: String,
      pincode: Number,
    },
    amount: Number,
    paymentMode: String,
    date: {
      type: Date,
    },
    razorOrderId: String,
    paymentId: String,
    paymentStatus: String,
    status: String,
    statusDescription: String,
    orderDetails: [
      {
        name: String,
        price: Number,
        quantity: Number,
        offers: {
          cashback: Number,
        },
      },
    ],
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    toObject: { virtuals: true },
  }
);

OrderDetailSchema.virtual("clientInfo", {
  ref: "Client",
  localField: "clientId",
  foreignField: "_id",
  justOne: true,
});

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
      const res = await this.find(matchQuery)
        .populate("clientInfo", "name contactNo")
        .sort({ createdAt: -1 });
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

  getOrderDetailsByQueryAndPopulate: async function (matchQuery) {
    try {
      const res = await this.findOne(matchQuery).populate(
        "clientInfo",
        "name lastName emailId"
      );
      return res;
    } catch (err) {
      throw err;
    }
  },

  updateOrderStatusById: async function (orderId, modefiedData) {
    try {
      const res = await this.findByIdAndUpdate(orderId, modefiedData, {
        new: true,
      });
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
