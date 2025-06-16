import Testimonial from "./testimonial.model";

export class TestimonialService {
  async addTestimonial(newTestimonial) {
    const Data = await Testimonial.addTestimonial(newTestimonial);
    return Data;
  }

  async getAllTestimonialList() {
    const data = await Testimonial.getTestimonialList({});
    return data;
  }

  async getTestimonialById(testimonialId) {
    const data = await Testimonial.getTestimonialById(testimonialId);
    return data;
  }

  async deleteTestimonialById(testId) {
    const data = await Testimonial.deleteTestimonialById(testId);
    return data;
  }

  async updateTestimonialById(testimonialId, modifiedData) {
    const data = await Testimonial.updateTestimonialById(
      testimonialId,
      modifiedData
    );
    return data;
  }
}
