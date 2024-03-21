import { Schema, model } from "mongoose";
import { IAboutUs, IAboutUsModel, NewAboutUsparams } from "./aboutUs.interface";

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
  addAboutUs: async function (data: NewAboutUsparams) {
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
      const aboutUs = await this.findOne(matchQuery);
      return aboutUs;
    } catch (err) {
      throw err;
    }
  },

  updateAboutUsId: async function (aboutId, data) {
    try {
      const aboutUs = await this.findByIdAndUpdate(
        aboutId,
        { $set: data },
        { new: true }
      );
      return aboutUs;
    } catch (err) {
      throw err;
    }
  },

  deleteAboutUsById: async function (aboutId) {
    try {
      const aboutUs = await this.findByIdAndDelete(aboutId);
      return aboutUs;
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
