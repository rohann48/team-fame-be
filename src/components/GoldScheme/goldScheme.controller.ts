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
import {
  NewGoldSchemeParams,
  UpdateGoldInvestmentParams,
  UpdateGoldSchemeParams,
} from "./goldScheme.interface";
import { GoldSchemeService } from "./goldScheme.service";

@Tags("GoldScheme")
@Route("tf/gold-scheme")
export class GoldSchemeController extends Controller {
  @SuccessResponse(200, HttpResponseMessage.FETCHED)
  // @Security("authenticate")
  @Get()
  public async getGoldSchemeList() {
    try {
      const data = await new GoldSchemeService().getGoldSchemeList({});
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
    @Body() newData: NewGoldSchemeParams
  ) {
    try {
      const doc = await new GoldSchemeService().addGoldScheme(newData);
      return new HttpSuccess(HttpResponseMessage.CREATED, doc);
    } catch (error) {
      let err: any = error;
      //   if (err.code === 11000) {
      //     return err;
      //   } else throw new HttpException(400, err, err?.message);
    }
  }

  @SuccessResponse(200, HttpResponseMessage.UPDATED)
  // @Security("authenticate")
  @Put("{schemeId}")
  public async updateSchemById(
    @Path() schemeId,
    @Body() modifiedData: UpdateGoldSchemeParams
  ) {
    try {
      const data = await new GoldSchemeService().updateSchemeById(
        schemeId,
        modifiedData
      );
      return new HttpSuccess(HttpResponseMessage.UPDATED, data);
    } catch (error) {
      console.log(error);
      throw new HttpException(400, error);
    }
  }

  @SuccessResponse(200, HttpResponseMessage.UPDATED)
  // @Security("authenticate")
  @Put("investment/{schemeId}")
  public async updateAboutUsId(
    @Path() schemeId,
    @Body() modifiedData: UpdateGoldInvestmentParams
  ) {
    try {
      const data = await new GoldSchemeService().updateSchemeInvestmentById(
        schemeId,
        modifiedData
      );
      return new HttpSuccess(HttpResponseMessage.UPDATED, data);
    } catch (error) {
      console.log(error);
      throw new HttpException(400, error);
    }
  }

  @SuccessResponse(200, HttpResponseMessage.FETCHED)
  // @Security("authenticate")
  @Get("{clientId}")
  public async getGoldSchemeByCLientId(@Query() clientId) {
    try {
      const data = await new GoldSchemeService().getGoldSchemeByQuery(clientId);
      return new HttpSuccess(HttpResponseMessage.FETCHED, data);
    } catch (error) {
      console.log(error);
      throw new HttpException(400, error);
    }
  }
}
