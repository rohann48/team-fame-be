import { Document, Model } from "mongoose";

interface IAboutUsSchema extends Document {
  _id: any;
  content: string;
}

//instance methods, virtuals
interface IAboutUsBase extends IAboutUsSchema {}

// document with string reference
export interface IAboutUs extends IAboutUsBase {}

// document with reference populated
export interface IAboutUsPopulated extends IAboutUs {}

export interface IAboutUsModel extends Model<IAboutUs> {
  addAboutUs(data: NewAboutUsparams): Promise<IAboutUs>;
  getAboutUsList(matchQuery: object): Promise<IAboutUs>;
  getAboutUsById(id: IAboutUs["_id"]): Promise<IAboutUs>;
  updateAboutUsId(id: IAboutUs["_id"], data): Promise<IAboutUs>;
  deleteAboutUsById(id: IAboutUs["_id"]): Promise<IAboutUs>;
}

export interface NewAboutUsparams {
  content: IAboutUs["content"];
}
