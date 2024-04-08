import { Schema, model } from "mongoose";
import { ICart, ICartModel } from "./cart.interface";

const fileDetails = {
  name: String,
  Key: String,
  path: String,
  date: Date,
};

export const CartSchema: Schema = new Schema(
  {
    name: String,
    title: String,
    description: String,
    location: String,
    status: String,
    date: Date,
    time: String,
    image: String,
    // image: fileDetails,
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    toObject: { virtuals: true },
  }
);

CartSchema.statics = {
  addCart: async function (data) {
    try {
      const cartData = new Cart(data);
      const cartDoc = await cartData.save();
      return cartDoc;
    } catch (err) {
      throw err;
    }
  },
  getCartList: async function (matchQuery) {
    try {
      const carts = await this.find(matchQuery);
      return carts;
    } catch (err) {
      throw err;
    }
  },

  getCartById: async function (id) {
    try {
      const carts = await this.findById(id);
      return carts;
    } catch (err) {
      throw err;
    }
  },

  deleteCartById: async function (cartId) {
    try {
      const response = await this.findByIdAndDelete(cartId);
      return response;
    } catch (err) {
      throw err;
    }
  },
};

const Cart: ICartModel = model<ICart, ICartModel>("Cart", CartSchema);
export default Cart;
