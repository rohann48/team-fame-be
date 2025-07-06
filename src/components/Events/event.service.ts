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
  async getAllEventClentList(matchQuery, selectQuery, populateQuery) {
    const data = await Event.getAllEventClentList(
      matchQuery,
      selectQuery,
      populateQuery
    );
    return data;
  }
  async getEventById(eventId) {
    const data = await Event.getEventById(eventId);
    return data;
  }

  async deleteEventById(eventId) {
    const data = await Event.deleteEventById(eventId);
    return data;
  }

  async updateEventById(eventId, modifiedData) {
    const data = await Event.updateEventById(eventId, modifiedData);
    return data;
  }
}
