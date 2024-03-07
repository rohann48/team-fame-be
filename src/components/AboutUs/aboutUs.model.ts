import { Schema, model } from "mongoose";
import { IAboutUs, IAboutUsModel } from "./aboutUs.interface";

export const AboutUsSchema: Schema = new Schema(
  {
    content: String,
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    toObject: { virtuals: true },
  }
);

AboutUsSchema.statics = {
  addAboutUs: async function (data) {
    try {
      const aboutUs = new AboutUs(data);
      const aboutUsDoc = await aboutUs.save();
      return aboutUsDoc;
    } catch (err) {
      throw err;
    }
  },
  getAboutUsList: async function (matchQuery) {
    try {
      const AboutUs = await this.findOne(matchQuery);
      return AboutUs;
    } catch (err) {
      throw err;
    }
  },
};

const AboutUs: IAboutUsModel = model<IAboutUs, IAboutUsModel>(
  "AboutUs",
  AboutUsSchema
);
export default AboutUs;
