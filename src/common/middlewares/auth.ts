import express, { Response as ExResponse, Request as ExRequest } from "express";
const jwt = require("jsonwebtoken");

export function expressAuthentication(
  req: ExRequest,
  // res,
  securityName: string,
  scopes?: string[]
) {
  // console.log("hy", securityName);

  // if (!token) {
  //   return req.res.status(401).send("Access Denied: No Token Provided");
  // }
  try {
    const token = req.cookies.authToken;
    return new Promise((resolve, reject) => {
      if (securityName === "authenticate") {
        if (!token) {
          reject(new Error("Access Denied: No Token Provided"));
        }
        jwt.verify(
          token,
          process.env.JWTPRIVATEKEY,
          function (err: any, decoded: any) {
            if (err) {
              reject(err);
            } else {
              // Check if JWT contains all required scopes
              for (let scope of scopes) {
                if (!decoded.scopes.includes(scope)) {
                  reject(new Error("JWT does not contain required scope."));
                }
              }
              // console.log("decoded", decoded);

              resolve(decoded);
            }
          }
        );
      } else {
        reject(new Error("Invalid Token"));
      }
    });
  } catch (ex) {
    req.res.status(401).send("Invalid Token");
  }
}
