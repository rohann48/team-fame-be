import express from "express";

// method and path check
export const unless = function (middleware, paths) {
  return function (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const pathCheck = paths.some(
      (pathInfo) =>
        (pathInfo.isRegEx
          ? pathInfo.path.test(req.path)
          : pathInfo.path === req.path) && pathInfo.methods.includes(req.method)
    );
    pathCheck ? next() : middleware(req, res, next);
  };
};
