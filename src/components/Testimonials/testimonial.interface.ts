import { Document, Model } from "mongoose";

interface fileDetails {
  name: String;
  Key: String;
  path: String;
  date: Date;
}
interface ITestimonialSchema extends Document {
  _id: any;
  name: string;
  about: string;
  achievement: string;
  image: string;
  // fileDetails;
}

//instance methods, virtuals
interface ITestimonialBase extends ITestimonialSchema {}

// document with string reference
export interface ITestimonial extends ITestimonialBase {}

// document with reference populated
export interface ITestimonialPopulated extends ITestimonial {}

export interface ITestimonialModel extends Model<ITestimonial> {
  addTestimonial(data: NewTestimonialparams): Promise<ITestimonial>;
  getTestimonialList(matchQuery: object): Promise<Array<ITestimonial>>;
  getTestimonialById(id: ITestimonial["_id"]): Promise<ITestimonial>;
  deleteTestimonialById(id: ITestimonial["_id"]): Promise<ITestimonial>;
}

export interface NewTestimonialparams {
  name: ITestimonial["name"];
  about: ITestimonial["about"];
  achievement: ITestimonial["achievement"];
  image?: ITestimonial["image"];
}
