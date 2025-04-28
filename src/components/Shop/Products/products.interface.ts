import { Document, Model } from "mongoose";

interface fileDetails {
  name: String;
  Key: String;
  path: String;
  date: Date;
}
interface IProductSchema extends Document {
  _id: any;
  name: string;
  category: string;
  details: string;
  price: string;
  imageInfo: Array<fileDetails>;
  offers: {
    cashback: number;
  };
  quantity: number;
}

//instance methods, virtuals
interface IProductBase extends IProductSchema {}

// document with string reference
export interface IProduct extends IProductBase {}

// document with reference populated
export interface IProductPopulated extends IProduct {}

export interface IProductModel extends Model<IProduct> {
  addProduct(data: NewProductparams): Promise<IProduct>;
  getProductList(matchQuery: object): Promise<Array<IProduct>>;
  getProductById(id: IProduct["_id"]): Promise<IProduct>;
  deleteProductById(id: IProduct["_id"]): Promise<IProduct>;
  updateProductById(id: string, data: object): Promise<IProduct>;
}

export interface NewProductparams {
  name: IProduct["name"];
  category: IProduct["category"];
  price: IProduct["price"];
  details: IProduct["details"];
  imageInfo?: IProduct["imageInfo"];
  cashback?: IProduct["offers"]["cashback"];
}
