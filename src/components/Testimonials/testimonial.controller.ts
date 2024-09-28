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
  Security,
} from "tsoa";
import express from "express";
import { HttpResponseMessage } from "../../common/constants/httpResponseMessage.enum";
import { HttpException, HttpSuccess } from "../../common/helpers/HttpResponse";
import { NewTestimonialparams } from "./testimonial.interface";
import { TestimonialService } from "./testimonial.service";
import formidable from "formidable";
import { FileUploadSingleMutliMiddleWare } from "../../common/middlewares/fileStorageSingleMulti.middleware";
import { s3File } from "../../common/functions/s3File";

@Tags("Testimonials")
@Route("tf/testimonial")
export class TestimonialController extends Controller {
  @SuccessResponse(200, HttpResponseMessage.FETCHED)
  // @Security("authenticate")
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
  @Security("authenticate")
  @Post()
  public async createTestimonial(@Request() req: express.Request) {
    function uploadFileToDoc(req: express.Request) {
      return new Promise((resolve, reject) => {
        const form = new formidable.IncomingForm();
        form.parse(req, async (err, fields, files) => {
          if (err) {
            reject(err);
          }
          try {
            let fileUploadToS3;
            let uploadedFileInfo = [];

            if (files?.fileToUpload) {
              fileUploadToS3 =
                await new FileUploadSingleMutliMiddleWare().addFile(
                  files,
                  fields.clientId as string
                );
              if (Array.isArray(fileUploadToS3)) {
                uploadedFileInfo.push(...fileUploadToS3);
              } else {
                uploadedFileInfo.push(fileUploadToS3);
              }
            }
            fields["imageInfo"] = uploadedFileInfo;
            let response = await new TestimonialService().addTestimonial(
              fields as NewTestimonialparams
            );
            resolve(response);
          } catch (err) {
            reject(err);
          }
        });
      });
    }

    try {
      const testimonial = await uploadFileToDoc(req);
      this.setStatus(201);
      return new HttpSuccess(HttpResponseMessage.CREATED, testimonial);
    } catch (error) {
      console.log(error);
      throw new HttpException(400, error);
    }
  }
  @SuccessResponse(201, HttpResponseMessage.DELETED)
  @Security("authenticate")
  @Delete("/delete")
  public async deleteTestimonial(
    @Request() req: express.Request,
    @Query() docId,
    @Query() fileKey
  ) {
    try {
      if (fileKey.length) {
        await new s3File().deleteFileOnlyFromS3(fileKey);
      }
      const doc = await new TestimonialService().deleteTestimonialById(docId);
      return new HttpSuccess(HttpResponseMessage.DELETED, doc);
    } catch (error: any) {
      throw new HttpException(400, error, error?.message);
    }
  }
  @SuccessResponse(200, HttpResponseMessage.FETCHED)
  // @Security("authenticate")
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
  @Security("authenticate")
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
