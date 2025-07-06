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
    imageInfo: [fileDetails],
    clientIds: [
      {
        type: Schema.Types.ObjectId,
        ref: "Client",
      },
    ],
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
  getAllEventClentList: async function (
    matchQuery,
    selectQuery,
    populateQuery
  ) {
    try {
      let query = this.find(matchQuery);

      if (selectQuery && Object.keys(selectQuery).length > 0) {
        query = query.select(selectQuery);
      }

      if (populateQuery && populateQuery.length > 0) {
        populateQuery.forEach((populate) => {
          query = query.populate(populate);
        });
      }

      return query.exec();
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

  updateEventById: async function (eventId, data) {
    try {
      const product = await this.findByIdAndUpdate(eventId, data, {
        new: true,
      });
      return product;
    } catch (err) {
      throw err;
    }
  },
};

const Event: IEventModel = model<IEvent, IEventModel>("Event", EventSchema);
export default Event;
