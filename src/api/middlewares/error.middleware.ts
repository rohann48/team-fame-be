import { NextFunction, Request, Response } from "express";
import { ValidateError } from "tsoa";
import { HttpException } from "../../common/helpers/HttpResponse";

function errorMiddleware(
  err: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof ValidateError) {
    console.warn(`Caught Validation Error for ${req.path}:`, err.fields);
    return res.status(422).json({
      message: "Validation Failed",
      details: err?.fields,
    });
  }
  if (err instanceof Error) {
    return res.status(err.status || 500).json({
      status: "ERROR",
      message: err.message || "Unexpected Error Occurred",
      ...(err && { error: err }),
    });
  }

  next();
}

export default errorMiddleware;
