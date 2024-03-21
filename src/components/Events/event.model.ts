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
    title: String,
    description: String,
    location: String,
    status: String,
    date: Date,
    time: String,
    image: String,
    // image: fileDetails,
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
      const events = await this.find(matchQuery);
      return events;
    } catch (err) {
      throw err;
    }
  },

  getEventById: async function (id) {
    try {
      const events = await this.findById(id);
      return events;
    } catch (err) {
      throw err;
    }
  },

  deleteEventById: async function (eventId) {
    try {
      const aboutUs = await this.findByIdAndDelete(eventId);
      return aboutUs;
    } catch (err) {
      throw err;
    }
  },
};

const Event: IEventModel = model<IEvent, IEventModel>("Event", EventSchema);
export default Event;
