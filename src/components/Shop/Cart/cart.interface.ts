import { Document, Model } from "mongoose";

interface fileDetails {
  name: String;
  Key: String;
  path: String;
  date: Date;
}
interface ICartSchema extends Document {
  _id: any;
  name: string;
  title: string;
  description: string;
  location: string;
  status: string;
  date: Date;
  time: string;
  image: string;
  // fileDetails;
}

//instance methods, virtuals
interface ICartBase extends ICartSchema {}

// document with string reference
export interface ICart extends ICartBase {}

// document with reference populated
export interface ICartPopulated extends ICart {}

export interface ICartModel extends Model<ICart> {
  addCart(data: NewCartparams): Promise<ICart>;
  getCartList(matchQuery: object): Promise<Array<ICart>>;
  getCartById(id: ICart["_id"]): Promise<ICart>;
  deleteCartById(id: ICart["_id"]): Promise<ICart>;
}

export interface NewCartparams {
  name: ICart["name"];
  title: ICart["title"];
  description: ICart["description"];
  location: ICart["location"];
  status: ICart["status"];
  image?: ICart["image"];
  date: ICart["date"];
  time: ICart["time"];
}
