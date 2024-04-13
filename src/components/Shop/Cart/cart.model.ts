import { Schema, model } from "mongoose";
import { ICart, ICartModel } from "./cart.interface";

const fileDetails = {
  name: String,
  Key: String,
  path: String,
  date: Date,
};

const productInfo = {
  productId: {
    type: Schema.Types.ObjectId,
    ref: "Product",
  },
  quantity: Number,
};

export const CartSchema: Schema = new Schema(
  {
    products: [productInfo],
    clientId: {
      type: Schema.Types.ObjectId,
      ref: "Client",
    },
    isInCart: Boolean,
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    toObject: { virtuals: true },
  }
);

// CartSchema.virtual("productInfo", {
//   ref: "Product",
//   foreignField: "_id",
//   localField: "products.productId",
//   justOne: false,
// });

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

  getCartByClientId: async function (clientId) {
    try {
      const carts = await this.findOne({ clientId }).populate(
        "products.productId"
      );
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

  updateCartById: async function (cartId, data) {
    try {
      const response = await this.findByIdAndUpdate(cartId, data, {
        new: true,
      });
      return response;
    } catch (err) {
      throw err;
    }
  },

  updateCartByClientId: async function (clientId, data) {
    try {
      const response = await this.findOneAndUpdate(
        { clientId: clientId },
        data,
        {
          new: true,
        }
      );
      return response;
    } catch (err) {
      throw err;
    }
  },
};

const Cart: ICartModel = model<ICart, ICartModel>("Cart", CartSchema);
export default Cart;
