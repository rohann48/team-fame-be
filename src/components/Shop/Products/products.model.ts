import { Schema, model } from "mongoose";
import { IProduct, IProductModel } from "./products.interface";

const fileDetails = {
  name: String,
  Key: String,
  path: String,
  date: Date,
};

export const ProductSchema: Schema = new Schema(
  {
    name: String,
    category: String,
    price: Number,
    details: String,
    imageInfo: [fileDetails],
    offers: {
      cashback: Number,
    },
    // image: fileDetails,
    quantity: Number,
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    toObject: { virtuals: true },
  }
);

ProductSchema.statics = {
  addProduct: async function (data) {
    try {
      const productData = new Product(data);
      const productDoc = await productData.save();
      return productDoc;
    } catch (err) {
      throw err;
    }
  },
  getProductList: async function (matchQuery) {
    try {
      const products = await this.find(matchQuery);
      return products;
    } catch (err) {
      throw err;
    }
  },

  getProductById: async function (id) {
    try {
      const products = await this.findById(id);
      return products;
    } catch (err) {
      throw err;
    }
  },

  deleteProductById: async function (ProductId) {
    try {
      const data = await this.findByIdAndDelete(ProductId);
      return data;
    } catch (err) {
      throw err;
    }
  },
  updateProductById: async function (ProductId, data) {
    try {
      const product = await this.findByIdAndUpdate(ProductId, data, {
        new: true,
      });
      return product;
    } catch (err) {
      throw err;
    }
  },
};

const Product: IProductModel = model<IProduct, IProductModel>(
  "Product",
  ProductSchema
);
export default Product;
