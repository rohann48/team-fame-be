import express from "express";

import { cryptoDecryptionRsa } from "../functions/cryptoEncryptDecrypt";
import { HttpException } from "../helpers/HttpResponse";
const url = require("url");

/**decrypt the encrypted request data*/
export function decryptRequestMiddleware(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    /**checking whether the req has a sessions embedded, else reject the req. */
    // if (
    //     (req?.headers?.apptype === "mob" || !process.env.ISDEVENV) &&
    //     !req?.session?.["userInfo"]
    // )
    //     throw "An unauthorised user";

    if (req?.headers?.apptype === "mob" || process.env.ISDEVENV != "true") {
      // first condition can be eliminted in production as ISDEVENV false in prod
      if (req?.body?.data?.length) {
        const decrypt = cryptoDecryptionRsa(req.body?.data);

        /**rejecting a req, incase of decrytion err */
        if (!decrypt) throw "Request payload is invalid";
        req.body = decrypt;
      }
      const route = cryptoDecryptionRsa(req.headers["endpoint"]);
      if (!route) throw "Request url is invalid";
      if (route) {
        req.url = req.url === "/" ? route : `${req.url}${route}`;

        const queryObject = url.parse(req.url, true).query;
        if (Object.keys(queryObject)?.length) {
          req.query = {
            ...queryObject,
          };
        }
      }
    }
    next();
  } catch (error) {
    next(new HttpException(400, error || "Request payload | url is invalid"));
  }
}
