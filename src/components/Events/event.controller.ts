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
  Security,
  Delete,
} from "tsoa";
import express from "express";
import { HttpResponseMessage } from "../../common/constants/httpResponseMessage.enum";
import { HttpException, HttpSuccess } from "../../common/helpers/HttpResponse";
import { NewEventparams } from "./event.interface";
import { EventService } from "./event.service";
import formidable from "formidable";
import { FileUploadSingleMutliMiddleWare } from "../../common/middlewares/fileStorageSingleMulti.middleware";
import { s3File } from "../../common/functions/s3File";
import { TestimonialService } from "../Testimonials/testimonial.service";

@Tags("Events")
@Route("tf/event")
export class EventController extends Controller {
  @SuccessResponse(200, HttpResponseMessage.FETCHED)
  // @Security("authenticate")
  @Get()
  public async getEvents() {
    try {
      const data = await new EventService().getAllEventList();
      return new HttpSuccess(HttpResponseMessage.FETCHED, data);
    } catch (error) {
      throw new HttpException(400, error);
    }
  }

  @SuccessResponse(201, HttpResponseMessage.CREATED)
  @Security("authenticate")
  @Post()
  public async createEvent(@Request() req: express.Request) {
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
            let response = await new EventService().addEvent(
              fields as NewEventparams
            );
            resolve(response);
          } catch (err) {
            reject(err);
          }
        });
      });
    }

    try {
      const event = await uploadFileToDoc(req);
      this.setStatus(201);
      return new HttpSuccess(HttpResponseMessage.CREATED, event);
    } catch (error) {
      console.log(error);
      throw new HttpException(400, error);
    }
  }

  @SuccessResponse(201, HttpResponseMessage.DELETED)
  @Security("authenticate")
  @Delete("/delete")
  public async deleteTEvent(
    @Request() req: express.Request,
    @Query() docId,
    @Query() fileKey
  ) {
    try {
      if (fileKey.length) {
        await new s3File().deleteFileOnlyFromS3(fileKey);
      }
      const doc = await new EventService().deleteEventById(docId);
      return new HttpSuccess(HttpResponseMessage.DELETED, doc);
    } catch (error: any) {
      throw new HttpException(400, error, error?.message);
    }
  }
  @SuccessResponse(200, HttpResponseMessage.FETCHED)
  // @Security("authenticate")
  @Get("{eventId}")
  public async getEventById(@Path() eventId) {
    try {
      const data = await new EventService().getEventById(eventId);
      return new HttpSuccess(HttpResponseMessage.FETCHED, data);
    } catch (error) {
      throw new HttpException(400, error);
    }
  }

  @SuccessResponse(200, HttpResponseMessage.DELETED)
  @Security("authenticate")
  @Get("delete/{eventId}")
  public async deleteEventById(@Path() eventId) {
    try {
      const data = await new EventService().deleteEventById(eventId);
      return new HttpSuccess(HttpResponseMessage.DELETED, data);
    } catch (error) {
      throw new HttpException(400, error);
    }
  }
}
