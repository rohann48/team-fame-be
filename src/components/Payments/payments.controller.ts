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
} from "tsoa";
import express from "express";
import { HttpResponseMessage } from "../../common/constants/httpResponseMessage.enum";
import { HttpException, HttpSuccess } from "../../common/helpers/HttpResponse";
import { PaymentDetailsService } from "./payments.service";
import path from "path";

@Tags("Payments")
@Route("tf/payments")
export class PaymentDetailsController extends Controller {
  @SuccessResponse(200, HttpResponseMessage.FETCHED)
  // @Security("authenticate")
  @Post("/create-order")
  public async paymentDetails(@Body() data) {
    try {
      const doc = await new PaymentDetailsService().paymentDetails(data);
      return new HttpSuccess(HttpResponseMessage.CREATED, doc); // Send order details to frontend, including order ID
    } catch (error: any) {
      throw new HttpException(400, error, error?.error?.description);
    }
  }

  @SuccessResponse(201, HttpResponseMessage.CREATED)
  // @Security("authenticate")
  @Post("/verify-payment")
  public async verifyPayment(@Body() data) {
    try {
      const doc = await new PaymentDetailsService().verifyPayment(data);
      return new HttpSuccess(HttpResponseMessage.CREATED, doc);
    } catch (error) {
      let err: any = error;
      throw new HttpException(400, err, err?.message);
    }
  }

  @SuccessResponse(200, HttpResponseMessage.FETCHED)
  // @Security("authenticate")
  @Get("/payment-success")
  public async getOrderDetailsByCLientId(@Request() req: express.Request) {
    try {
      req.res.sendFile(path.join(__dirname, "success.html"));
    } catch (error) {
      console.log(error);
      throw new HttpException(400, error);
    }
  }
}
