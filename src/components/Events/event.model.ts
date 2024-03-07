import { Schema, model } from "mongoose";
import { IEvent, IEventModel } from "./event.interface";

const fileDetails = {
  name: String,
  Key: String,
  path: String,
  date: Date,
};

export const EventSchema: Schema = new Schema(
  {
    name: String,
    details: String,
    status: String,
    image: fileDetails,
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    toObject: { virtuals: true },
  }
);

EventSchema.statics = {
  addEvent: async function (data) {
    try {
      const event = new Event(data);
      const eventDoc = await event.save();
      return eventDoc;
    } catch (err) {
      throw err;
    }
  },
  getEventList: async function (matchQuery) {
    try {
      const Events = await this.find(matchQuery);
      return Events;
    } catch (err) {
      throw err;
    }
  },

  getEventById: async function (id) {
    try {
      const Events = await this.findById(id);
      return Events;
    } catch (err) {
      throw err;
    }
  },
};

const Event: IEventModel = model<IEvent, IEventModel>("Event", EventSchema);
export default Event;
