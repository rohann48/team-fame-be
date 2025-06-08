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
} from "tsoa";
import express from "express";
import { HttpResponseMessage } from "../../common/constants/httpResponseMessage.enum";
import { HttpException, HttpSuccess } from "../../common/helpers/HttpResponse";
import { VideoService } from "./videos.service";
import formidable from "formidable";
import { FileUploadSingleMutliMiddleWare } from "../../common/middlewares/fileStorageSingleMulti.middleware";

@Tags("Videos")
@Route("tf/video")
export class VideoController extends Controller {
  @SuccessResponse(200, HttpResponseMessage.FETCHED)
  // @Security("authenticate")
  @Get("/list")
  public async getVideos() {
    try {
      const data = await new VideoService().getAllVideoList();
      return new HttpSuccess(HttpResponseMessage.FETCHED, data);
    } catch (error) {
      throw new HttpException(400, error);
    }
  }
  @SuccessResponse(201, HttpResponseMessage.CREATED)
  // @Security("authenticate")
  @Post()
  public async createVideo(@Request() req: express.Request) {
    function uploadFileToDocument(req) {
      return new Promise((resolve, reject) => {
        const form = new formidable.IncomingForm();
        form.parse(req, async (err, fields, files) => {
          if (err) {
            reject(err);
          }
          try {
            let fileUploadToS3;
            let uploadedFileInfo = [];
            if (files.fileToUpload) {
              fileUploadToS3 =
                await new FileUploadSingleMutliMiddleWare().addFile(
                  files,
                  fields.clientId
                );
              //Checking if there is multiple or single file info
              if (Array.isArray(fileUploadToS3)) {
                uploadedFileInfo.push(...fileUploadToS3);
              } else {
                uploadedFileInfo.push(fileUploadToS3);
              }
            }
            fields["videoInfo"] = uploadedFileInfo;
            // console.log("sdsfsf", fields);
            let response = await new VideoService().addVideo(fields);
            resolve(response);
          } catch (err) {
            console.log(err);
            reject(err);
          }
        });
      });
    }

    try {
      const updateData = await uploadFileToDocument(req);
      this.setStatus(201);
      return new HttpSuccess(HttpResponseMessage.CREATED, updateData);
    } catch (error) {
      console.log("err", error);
      throw new HttpException(400);
    }
  }

  @SuccessResponse(200, HttpResponseMessage.FETCHED)
  // @Security("authenticate")
  @Get("{videoId}")
  public async getVideosById(@Path() videoId) {
    try {
      const data = await new VideoService().getVideoById(videoId);
      return new HttpSuccess(HttpResponseMessage.FETCHED, data);
    } catch (error) {
      console.log(error);
      throw new HttpException(400, error);
    }
  }
}
