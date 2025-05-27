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
import { NewOrderDetailParams } from "./orderDetails.interface";
import { OrderDetailsService } from "./orderDetails.service";
import { Types } from "mongoose";

@Tags("OrderDetails")
@Route("tf/order-details")
export class OrderDetailsController extends Controller {
  @SuccessResponse(200, HttpResponseMessage.FETCHED)
  @Security("authenticate")
  @Get("/list")
  public async getOrderDetailList(@Query() userId?) {
    try {
      const matchQuery = {
        ...(userId !== "undefined" && { clientId: userId }),
      };
      const data = await new OrderDetailsService().getOrderDetailList(
        matchQuery
      );
      return new HttpSuccess(HttpResponseMessage.FETCHED, data);
    } catch (error) {
      console.log(error);
      throw new HttpException(400, error);
    }
  }

  @SuccessResponse(201, HttpResponseMessage.CREATED)
  // @Security("authenticate")
  @Post()
  public async addOrderDetails(
    @Request() req: express.Request,
    @Body() newData: NewOrderDetailParams
  ) {
    try {
      const doc = await new OrderDetailsService().addOrderDetails(newData);
      return new HttpSuccess(HttpResponseMessage.CREATED, doc);
    } catch (error) {
      let err: any = error;
      //   if (err.code === 11000) {
      //     return err;
      //   } else throw new HttpException(400, err, err?.message);
    }
  }

  @SuccessResponse(200, HttpResponseMessage.FETCHED)
  // @Security("authenticate")
  @Get("selected/{clientId}")
  public async getOrderDetailsByCLientId(@Path() clientId) {
    try {
      const matchQuery = {
        clientId: new Types.ObjectId(clientId),
      };
      const data = await new OrderDetailsService().getOrderDetailsByQuery(
        matchQuery
      );
      return new HttpSuccess(HttpResponseMessage.FETCHED, data);
    } catch (error) {
      console.log(error);
      throw new HttpException(400, error);
    }
  }

  @SuccessResponse(201, HttpResponseMessage.CREATED)
  // @Security("authenticate")
  @Put("/update/status")
  public async updateOrderStatus(
    @Request() req: express.Request,
    @Query() orderId,
    @Query() status: string
  ) {
    try {
      const doc = await new OrderDetailsService().updateOrderStatusById(
        orderId,
        status
      );
      return new HttpSuccess(HttpResponseMessage.CREATED, doc);
    } catch (error) {
      let err: any = error;
      throw new HttpException(400, err, err?.message);
    }
  }
}
