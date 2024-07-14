import { OfferService } from "./offer.service";
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
import { HttpResponseMessage } from "../../../common/constants/httpResponseMessage.enum";
import {
  HttpException,
  HttpSuccess,
} from "../../../common/helpers/HttpResponse";
import { NewOfferParams } from "./offer.interface";

@Tags("Offers")
@Route("tf/offer")
export class OfferController extends Controller {
  // @SuccessResponse(200, HttpResponseMessage.FETCHED)
  // @Security("authenticate")
  // @Get()
  // public async getOffers() {
  //   try {
  //     const data = await new OfferService().getAllOfferList();
  //     return new HttpSuccess(HttpResponseMessage.FETCHED, data);
  //   } catch (error) {
  //     throw new HttpException(400, error);
  //   }
  // }

  @SuccessResponse(201, HttpResponseMessage.CREATED)
  @Security("authenticate")
  @Post()
  public async createOffers(
    @Request() req: express.Request,
    @Body() offerParams: NewOfferParams
  ) {
    try {
      const Offer = await new OfferService().addOffer(offerParams);
      return new HttpSuccess(HttpResponseMessage.CREATED, Offer);
    } catch (error) {
      let err: any = error;
    }
  }

  // @SuccessResponse(200, HttpResponseMessage.FETCHED)
  // // @Security("authenticate")
  // @Put("/product/quantity")
  // public async updateOffers(@Query() clientId, @Body() modifiedData) {
  //   try {
  //     const data = await new OfferService().updateProductQuantityById(
  //       clientId,
  //       modifiedData
  //     );
  //     return new HttpSuccess(HttpResponseMessage.FETCHED, data);
  //   } catch (error) {
  //     console.log(error);

  //     throw new HttpException(400, error);
  //   }
  // }
}
