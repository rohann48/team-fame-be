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
import { AddressService } from "./address.service";
import { NewAddressParams } from "./address.interface";

@Tags("Address")
@Route("tf/address")
export class AddressController extends Controller {
  @SuccessResponse(200, HttpResponseMessage.FETCHED)
  // @Security("authenticate")
  @Get()
  public async getAddressList() {
    try {
      const data = await new AddressService().getAllAddressList();
      return new HttpSuccess(HttpResponseMessage.FETCHED, data);
    } catch (error) {
      throw new HttpException(400, error);
    }
  }

  @SuccessResponse(201, HttpResponseMessage.CREATED)
  @Security("authenticate")
  @Post()
  public async createAddress(
    @Request() req: express.Request,
    @Body() newAddress: NewAddressParams
  ) {
    try {
      const address = await new AddressService().addAddress(newAddress);
      return new HttpSuccess(HttpResponseMessage.CREATED, address);
    } catch (error) {
      let err: any = error;
      //   if (err.code === 11000) {
      //     return err;
      //   } else throw new HttpException(400, err, err?.message);
    }
  }

  @SuccessResponse(200, HttpResponseMessage.FETCHED)
  // @Security("authenticate")
  @Get("{testimonialId}")
  public async getAddressById(@Path() testimonialId) {
    try {
      const data = await new AddressService().getAddressById(testimonialId);
      return new HttpSuccess(HttpResponseMessage.FETCHED, data);
    } catch (error) {
      throw new HttpException(400, error);
    }
  }

  @SuccessResponse(200, HttpResponseMessage.DELETED)
  @Security("authenticate")
  @Delete("delete/{aboutId}")
  public async deleteAddressById(@Path() aboutId) {
    try {
      const data = await new AddressService().deleteAddressById(aboutId);
      return new HttpSuccess(HttpResponseMessage.DELETED, data);
    } catch (error) {
      console.log(error);
      throw new HttpException(400, error);
    }
  }
}
