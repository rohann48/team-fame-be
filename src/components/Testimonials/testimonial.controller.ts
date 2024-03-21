import {
  Body,
  Controller,
  Request,
  Get,
  Path,
  Post,
  Query,
  Route,
  Put,
  SuccessResponse,
  Tags,
  Delete,
} from "tsoa";
import express from "express";
import { HttpResponseMessage } from "../../common/constants/httpResponseMessage.enum";
import { HttpException, HttpSuccess } from "../../common/helpers/HttpResponse";
import { NewTestimonialparams } from "./testimonial.interface";
import { TestimonialService } from "./testimonial.service";

@Tags("Testimonials")
@Route("tf/testimonial")
export class TestimonialController extends Controller {
  @SuccessResponse(200, HttpResponseMessage.FETCHED)
  @Get()
  public async getTestimonialList() {
    try {
      const data = await new TestimonialService().getAllTestimonialList();
      return new HttpSuccess(HttpResponseMessage.FETCHED, data);
    } catch (error) {
      throw new HttpException(400, error);
    }
  }

  @SuccessResponse(201, HttpResponseMessage.CREATED)
  @Post()
  public async createTestimonial(
    @Request() req: express.Request,
    @Body() newTestimonial: NewTestimonialparams
  ) {
    try {
      const testimonial = await new TestimonialService().addTestimonial(
        newTestimonial
      );
      return new HttpSuccess(HttpResponseMessage.CREATED, testimonial);
    } catch (error) {
      let err: any = error;
      //   if (err.code === 11000) {
      //     return err;
      //   } else throw new HttpException(400, err, err?.message);
    }
  }

  @SuccessResponse(200, HttpResponseMessage.FETCHED)
  @Get("{testimonialId}")
  public async getTestimonialById(@Path() testimonialId) {
    try {
      const data = await new TestimonialService().getTestimonialById(
        testimonialId
      );
      return new HttpSuccess(HttpResponseMessage.FETCHED, data);
    } catch (error) {
      throw new HttpException(400, error);
    }
  }

  @SuccessResponse(200, HttpResponseMessage.DELETED)
  @Delete("delete/{aboutId}")
  public async deleteTestimonialById(@Path() aboutId) {
    try {
      const data = await new TestimonialService().deleteTestimonialById(
        aboutId
      );
      return new HttpSuccess(HttpResponseMessage.DELETED, data);
    } catch (error) {
      console.log(error);
      throw new HttpException(400, error);
    }
  }
}
