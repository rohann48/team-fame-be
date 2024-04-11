import { Document, Model, Types } from "mongoose";
interface videoDetails {
  name: String;
  Key: String;
  path: String;
  date: Date;
}
interface IVideoSchema extends Document {
  _id: any;
  title: string;
  description: string;
  videoInfo: Array<videoDetails>;
}
//instance methods, virtuals
interface IVideoBase extends IVideoSchema {}

// document with string reference
export interface IVideo extends IVideoBase {}

// document with reference populated
export interface IVideoPopulated extends IVideo {}

export interface IVideoModel extends Model<IVideo> {
  addVideo(data: NewVideoParams): Promise<IVideo>;
  getVideoList(matchQuery: object): Promise<Array<IVideo>>;
  getVideoById(id: IVideo["_id"]): Promise<IVideo>;
}

export interface NewVideoParams {
  title: IVideo["title"];
  description: IVideo["description"];
  videoInfo?: Array<videoDetails>;
}
