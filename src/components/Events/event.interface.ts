import { Document, Model } from "mongoose";

interface fileDetails {
  name: String;
  Key: String;
  path: String;
  date: Date;
}
interface IEventSchema extends Document {
  _id: any;
  name: string;
  title: string;
  description: string;
  location: string;
  status: string;
  date: Date;
  time: string;
  imageInfo: [fileDetails];
}

//instance methods, virtuals
interface IEventBase extends IEventSchema {}

// document with string reference
export interface IEvent extends IEventBase {}

// document with reference populated
export interface IEventPopulated extends IEvent {}

export interface IEventModel extends Model<IEvent> {
  addEvent(data: NewEventparams): Promise<IEvent>;
  getEventList(matchQuery: object): Promise<Array<IEvent>>;
  getEventById(id: IEvent["_id"]): Promise<IEvent>;
  deleteEventById(id: IEvent["_id"]): Promise<IEvent>;
}

export interface NewEventparams {
  name: IEvent["name"];
  title: IEvent["title"];
  description: IEvent["description"];
  location: IEvent["location"];
  status: IEvent["status"];
  date: IEvent["date"];
  time: IEvent["time"];
}
