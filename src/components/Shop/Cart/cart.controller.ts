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
import { CartService } from "./cart.services";
import formidable from "formidable";
import { FileUploadSingleMutliMiddleWare } from "../../../common/middlewares/fileStorageSingleMulti.middleware";

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
  public async createCart(@Request() req: express.Request) {
    function uploadFileToDoc(req) {
      return new Promise((resolve, reject) => {
        const form = new formidable.IncomingForm({ multiples: true });

        form.parse(req, async (err, fields, files) => {
          if (err) {
            reject(err);
          }
          try {
            /**Uploading the file to AWS s3 */
            let fileUploadToS3;
            let uploadedFileInfo = [];
            if (files.fileToUpload) {
              fileUploadToS3 =
                await new FileUploadSingleMutliMiddleWare().addFile(
                  files,
                  fields.companyId
                );

              //Checking if there is multiple or single file info
              if (Array.isArray(fileUploadToS3)) {
                uploadedFileInfo.push(...fileUploadToS3);
              } else {
                uploadedFileInfo.push(fileUploadToS3);
              }
            }

            // let response =
            //   await new ActionPlanStepsService().updateUploadedFileToDoc(
            //     fields.docId,
            //     uploadedFileInfo,
            //     fields
            //   );
            // resolve(response);
          } catch (err) {
            console.log(err);
            reject(err);
          }
        });
      });
    }
    try {
      const updateData = await uploadFileToDoc(req);
      this.setStatus(201);
      return new HttpSuccess(HttpResponseMessage.CREATED, updateData);
    } catch (err) {
      throw new HttpException(400);
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
}
