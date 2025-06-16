import { Schema, model } from "mongoose";
import { ITestimonial, ITestimonialModel } from "./testimonial.interface";

const fileDetails = {
  name: String,
  Key: String,
  path: String,
  date: Date,
};

export const TestimonialSchema: Schema = new Schema(
  {
    name: String,
    about: String,
    achievement: String,
    imageInfo: [fileDetails],
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

TestimonialSchema.statics = {
  addTestimonial: async function (data) {
    try {
      const testimonial = new Testimonial(data);
      const doc = await testimonial.save();
      return doc;
    } catch (err) {
      throw err;
    }
  },
  getTestimonialList: async function (matchQuery) {
    try {
      const testimonials = await this.find(matchQuery);
      return testimonials;
    } catch (err) {
      throw err;
    }
  },

  getTestimonialById: async function (id) {
    try {
      const testimonial = await this.findById(id);
      return testimonial;
    } catch (err) {
      throw err;
    }
  },

  deleteTestimonialById: async function (testId) {
    try {
      const doc = await this.findByIdAndDelete(testId);
      return doc;
    } catch (err) {
      throw err;
    }
  },

  updateTestimonialById: async function (ProductId, data) {
    try {
      const product = await this.findByIdAndUpdate(ProductId, data, {
        new: true,
      });
      return product;
    } catch (err) {
      throw err;
    }
  },
};

const Testimonial: ITestimonialModel = model<ITestimonial, ITestimonialModel>(
  "Testimonial",
  TestimonialSchema
);
export default Testimonial;
