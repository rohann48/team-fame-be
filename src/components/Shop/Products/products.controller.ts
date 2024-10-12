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
import { HttpResponseMessage } from "../../../common/constants/httpResponseMessage.enum";
import {
  HttpException,
  HttpSuccess,
} from "../../../common/helpers/HttpResponse";
//   import { NewProductparams } from "./Product.interface";
import { ProductService } from "./products.service";
import formidable from "formidable";
import { FileUploadSingleMutliMiddleWare } from "../../../common/middlewares/fileStorageSingleMulti.middleware";
import { s3File } from "../../../common/functions/s3File";

@Tags("Products")
@Route("tf/shop/product")
export class ProductController extends Controller {
  @SuccessResponse(200, HttpResponseMessage.FETCHED)
  // @Security("authenticate")
  @Get("/list")
  public async getProducts() {
    try {
      const data = await new ProductService().getAllProductList();
      return new HttpSuccess(HttpResponseMessage.FETCHED, data);
    } catch (error) {
      throw new HttpException(400, error);
    }
  }

  @SuccessResponse(201, HttpResponseMessage.CREATED)
  @Security("authenticate")
  @Post()
  public async createProduct(@Request() req: express.Request) {
    function uploadFileToDoc(req) {
      return new Promise((resolve, reject) => {
        const form = new formidable.IncomingForm();
        form.parse(req, async (err, fields, files) => {
          if (err) {
            reject(err);
          }
          try {
            /**Uploading the file to AWS s3 */
            let fileUploadToS3;
            let uploadedFileInfo = [];
            console.log("fields", fields);

            if (files?.fileToUpload) {
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
            fields["imageInfo"] = uploadedFileInfo;

            let response = await new ProductService().addProduct(fields);
            resolve(response);
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
      console.log(err);

      throw new HttpException(400);
    }
  }
  @SuccessResponse(201, HttpResponseMessage.DELETED)
  @Security("authenticate")
  @Delete("/delete")
  public async deleteProduct(
    @Request() req: express.Request,
    @Query() docId,
    @Query() fileKey
  ) {
    try {
      if (fileKey.length) {
        await new s3File().deleteFileOnlyFromS3(fileKey);
      }
      const doc = await new ProductService().deleteProduct(docId);
      return new HttpSuccess(HttpResponseMessage.DELETED, doc);
    } catch (error: any) {
      throw new HttpException(400, error, error?.message);
    }
  }

  @SuccessResponse(200, HttpResponseMessage.FETCHED)
  // @Security("authenticate")
  @Get("{productId}")
  public async getProductById(@Path() productId) {
    try {
      const data = await new ProductService().getProductById(productId);
      return new HttpSuccess(HttpResponseMessage.FETCHED, data);
    } catch (error) {
      throw new HttpException(400, error);
    }
  }

  // @SuccessResponse(200, HttpResponseMessage.DELETED)
  // @Security("authenticate")
  // @Get("delete/{productId}")
  // public async deleteProductById(@Path() productId) {
  //   try {
  //     const data = await new ProductService().deleteProductById(productId);
  //     return new HttpSuccess(HttpResponseMessage.DELETED, data);
  //   } catch (error) {
  //     throw new HttpException(400, error);
  //   }
  // }
}
