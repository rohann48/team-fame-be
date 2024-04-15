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
//   import { NewCartparams } from "./shop.interface";
import { CartService } from "./cart.service";
import formidable from "formidable";
import { FileUploadSingleMutliMiddleWare } from "../../../common/middlewares/fileStorageSingleMulti.middleware";
import { NewCartparams } from "./cart.interface";

@Tags("Carts")
@Route("tf/cart")
export class CartController extends Controller {
  @SuccessResponse(200, HttpResponseMessage.FETCHED)
  @Security("authenticate")
  @Get()
  public async getCarts() {
    try {
      const data = await new CartService().getAllCartList();
      return new HttpSuccess(HttpResponseMessage.FETCHED, data);
    } catch (error) {
      throw new HttpException(400, error);
    }
  }

  @SuccessResponse(201, HttpResponseMessage.CREATED)
  @Security("authenticate")
  @Post()
  public async createCart(
    @Request() req: express.Request,
    @Body() newCart: NewCartparams
  ) {
    try {
      const cart = await new CartService().addCart(newCart);
      return new HttpSuccess(HttpResponseMessage.CREATED, cart);
    } catch (error) {
      let err: any = error;
    }
  }

  @SuccessResponse(200, HttpResponseMessage.FETCHED)
  @Security("authenticate")
  @Get("{cartId}")
  public async getCartById(@Path() cartId) {
    try {
      const data = await new CartService().getCartById(cartId);
      return new HttpSuccess(HttpResponseMessage.FETCHED, data);
    } catch (error) {
      throw new HttpException(400, error);
    }
  }

  @SuccessResponse(200, HttpResponseMessage.FETCHED)
  @Security("authenticate")
  @Get("/list/client")
  public async getCartByClientId(@Query() clientId) {
    try {
      const data = await new CartService().getCartByClientId(clientId);
      return new HttpSuccess(HttpResponseMessage.FETCHED, data);
    } catch (error) {
      console.log(error);

      throw new HttpException(400, error);
    }
  }

  @SuccessResponse(200, HttpResponseMessage.DELETED)
  @Security("authenticate")
  @Get("delete/{cartId}")
  public async deleteCartById(@Path() cartId) {
    try {
      const data = await new CartService().deleteCartById(cartId);
      return new HttpSuccess(HttpResponseMessage.DELETED, data);
    } catch (error) {
      throw new HttpException(400, error);
    }
  }

  @SuccessResponse(200, HttpResponseMessage.FETCHED)
  // @Security("authenticate")
  @Put("/product/quantity")
  public async updateProductQuantity(@Query() clientId, @Body() modifiedData) {
    try {
      const data = await new CartService().updateProductQuantityById(
        clientId,
        modifiedData
      );
      return new HttpSuccess(HttpResponseMessage.FETCHED, data);
    } catch (error) {
      console.log(error);

      throw new HttpException(400, error);
    }
  }

  // @Security("authenticate")
  @Put("/product/cart")
  public async removeProductFromCart(@Query() clientId, @Query() productId) {
    try {
      const data = await new CartService().removeProductCartById(
        clientId,
        productId
      );
      return new HttpSuccess(HttpResponseMessage.FETCHED, data);
    } catch (error) {
      console.log(error);

      throw new HttpException(400, error);
    }
  }
}
