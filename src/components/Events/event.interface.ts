import { Document, Model } from "mongoose";

interface fileDetails {
  name: String;
  Key: String;
  path: String;
  date: Date;
}
interface IEventSchema extends Document {
  _id: any;
  name: String;
  details: String;
  status: String;
  image: fileDetails;
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
}

export interface NewEventparams {
  name: IEvent["name"];
  details: IEvent["details"];
  status: IEvent["status"];
  image: IEvent["image"];
}
