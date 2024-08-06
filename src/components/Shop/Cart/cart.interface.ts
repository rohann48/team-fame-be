import { Document, Model } from "mongoose";
import { IClient } from "../../Clients/client.interface";
import { IProduct } from "../Products/products.interface";

interface productInfo {
  productId: IProduct["_id"];
  quantity: number;
}
interface ICartSchema extends Document {
  _id: any;
  clientId: IClient["_id"];
  products: Array<productInfo>;
  isInCart: boolean;
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
  getCartByClientId(clientId: IClient["_id"]): Promise<ICart>;
  updateCartById(cartId: ICart["_id"], data): Promise<ICart>;
  updateCartByClientId(clientId: IClient["_id"], data): Promise<ICart>;
}

export interface NewCartparams {
  clientId: ICart["clientId"];
  products: ICart["products"];
  isInCart?: ICart["isInCart"];
}
