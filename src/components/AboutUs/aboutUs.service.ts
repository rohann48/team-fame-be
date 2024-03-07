import AboutUs from "./aboutUs.model";

export class AboutUsService {
  async addAboutUs(newAboutUs) {
    const Data = await AboutUs.addAboutUs(newAboutUs);
    return Data;
  }

  async getAboutUsList() {
    const data = await AboutUs.getAboutUsList({});
    return data;
  }
}
