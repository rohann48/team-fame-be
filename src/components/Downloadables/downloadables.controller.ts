import { Request, Response, Express } from "express";
import { HttpException } from "../../common/helpers/HttpResponse";
import path from "path";
import { s3File } from "../../common/functions/s3File";

export class Downloadables {
  constructor(app: Express) {
    this.initializeRoutes(app);
  }
  initializeRoutes(app) {
    // app.get("/sap/action-plan/file/download/:key", new s3File().downloadS3File);
  }
}
