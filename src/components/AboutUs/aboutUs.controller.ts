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
import { NewAboutUsparams } from "./aboutUs.interface";
import { AboutUsService } from "./aboutUs.service";

@Tags("AboutUs")
@Route("tf/aboutus")
export class AboutUsController extends Controller {
  @SuccessResponse(200, HttpResponseMessage.FETCHED)
  // @Security("authenticate")
  @Get()
  public async getActionPlansForSupplier() {
    try {
      const data = await new AboutUsService().getAboutUsList({});
      return new HttpSuccess(HttpResponseMessage.FETCHED, data);
    } catch (error) {
      console.log(error);
      throw new HttpException(400, error);
    }
  }

  @SuccessResponse(201, HttpResponseMessage.CREATED)
  // @Security("authenticate")
  @Post()
  public async createActionPlanForSupplier(
    @Request() req: express.Request,
    @Body() newData
  ) {
    try {
      const doc = await new AboutUsService().addAboutUs(newData);
      return new HttpSuccess(HttpResponseMessage.CREATED, doc);
    } catch (error) {
      let err: any = error;
      //   if (err.code === 11000) {
      //     return err;
      //   } else throw new HttpException(400, err, err?.message);
    }
  }

  @SuccessResponse(200, HttpResponseMessage.FETCHED)
  @Security("authenticate")
  @Put("{aboutId}")
  public async updateAboutUsId(@Path() aboutId, @Query() modifiedData) {
    try {
      const data = await new AboutUsService().updateAboutUsId(
        aboutId,
        modifiedData
      );
      return new HttpSuccess(HttpResponseMessage.FETCHED, data);
    } catch (error) {
      console.log(error);
      throw new HttpException(400, error);
    }
  }

  @SuccessResponse(200, HttpResponseMessage.DELETED)
  @Security("authenticate")
  @Delete("delete/{aboutId}")
  public async deleteAboutUsById(@Path() aboutId) {
    try {
      const data = await new AboutUsService().deleteAboutUsById(aboutId);
      return new HttpSuccess(HttpResponseMessage.DELETED, data);
    } catch (error) {
      console.log(error);
      throw new HttpException(400, error);
    }
  }
}
