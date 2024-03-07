import Event from "./event.model";

export class EventService {
  async addEvent(newEvent) {
    const Data = await Event.addEvent(newEvent);
    return Data;
  }

  async getAllEventList() {
    const data = await Event.getEventList({});
    return data;
  }

  async getEventById(eventId) {
    const data = await Event.getEventById(eventId);
    return data;
  }
}
