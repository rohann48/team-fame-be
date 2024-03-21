import AboutUs from "./aboutUs.model";

export class AboutUsService {
  async addAboutUs(newAboutUs) {
    const prevData = await this.getAboutUsList({});
    let data;
    if (prevData) {
      data = await this.updateAboutUsId(prevData._id, newAboutUs);
    } else {
      data = await AboutUs.addAboutUs(newAboutUs);
    }
    return data;
  }

  async getAboutUsList(matchQuery) {
    const data = await AboutUs.getAboutUsList(matchQuery);
    return data;
  }

  async updateAboutUsId(aboutId, modifiedData) {
    const data = await AboutUs.updateAboutUsId(aboutId, modifiedData);
    return data;
  }

  async deleteAboutUsById(aboutId) {
    const data = await AboutUs.deleteAboutUsById(aboutId);
    return data;
  }
}
