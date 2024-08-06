import express, { Response as ExResponse, Request as ExRequest } from "express";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import http from "http";
import https from "https";
import dotenv from "dotenv";
dotenv.config();
import { RegisterRoutes } from "../build/routes";
import swaggerUi from "swagger-ui-express";
import { decryptRequestMiddleware } from "./common/middlewares/decryptRequestMiddleware";
import { unless } from "./api/middlewares/allowedPaths.middleware";
import { errorMiddleware } from "./api/middlewares";
import { Downloadables } from "./components/Downloadables/downloadables.controller";
import fs from "fs";

const hpp = require("hpp");
const helmet = require("helmet");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const app = express();

// Certificate
const privateKey = fs.readFileSync(
  "/etc/letsencrypt/live/api.team-fame.com/privkey.pem",
  "utf8"
);
const certificate = fs.readFileSync(
  "/etc/letsencrypt/live/api.team-fame.com/cert.pem",
  "utf8"
);
const ca = fs.readFileSync(
  "/etc/letsencrypt/live/api.team-fame.com/chain.pem",
  "utf8"
);

const credentials = {
  key: privateKey,
  cert: certificate,
  ca: ca,
};

app.use(helmet());
app.use((req, res, next) => {
  res.setHeader("X-XSS-Protection", "1; mode=block");
  next();
});
app.use(
  cors({
    credentials: true,
    origin: process.env.CORS_ORIGIN?.split("|").map((origin) => {
      return new RegExp(`${origin?.trim()}$`);
    }),
  })
);
const sessionStore = new MongoDBStore({
  uri: process.env.SESSION_DB,
  collection: "famesessions",
});
sessionStore.on("error", function (error) {
  console.log(error);
});
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
    store: sessionStore,
    resave: true,
    name: "sessionId",
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(hpp());
mongoose.connect(process.env.MONGODB_URI!);
mongoose.connection.on("error", (err: any) => {
  console.log(
    "%s MongoDB connection error. Please make sure MongoDB is running.",
    err
  );
  process.exit();
});
const port = process.env.PORT || 3002;
let server;
let httpsServer;
if (process.env.NODE_ENV === "development") {
  server = new http.Server(app);
} else {
  httpsServer = new https.Server(credentials, app);
}
app.use(
  "/tf/docs",
  swaggerUi.serve,
  async (_req: ExRequest, res: ExResponse) => {
    return res.send(
      swaggerUi.generateHTML(await import("../build/swagger.json"))
    );
  }
);
app.get("/health/check", (req, res, next) => {
  res.status(200).send();
});
// import uniqid from "uniqid";
// import axios from "axios";
// import sha256 from "sha256";

// app.post(
//   "/tf/order-details/online/transaction/phonpe",
//   async function (req, res) {
//     console.log("hellooo");
//     const PHONE_PE_HOST_URL = "https://api-preprod.phonepe.com/apis/pg-sandbox";
//     const payEndpoint = "/pg/v1/pay";
//     const MERCHANT_ID = "UATM22YJFZ86K7YG";
//     const merchantTransactionId = uniqid();
//     const userId = 123;
//     const data = {
//       merchantId: MERCHANT_ID,
//       merchantTransactionId: merchantTransactionId,
//       merchantUserId: userId,
//       amount: 100 * 100, //in paisa
//       redirectUrl: `http://localhost:9001/payment/validate/${merchantTransactionId}`,
//       redirectMode: "POST",
//       callbackUrl: `http://localhost:9001/payment/validate/${merchantTransactionId}`,
//       mobileNumber: "9876543212",
//       paymentInstrument: {
//         type: "PAY_PAGE",
//       },
//     };

//     const SALT_INDEX = 1;
//     const SALT_KEY = "9793d0d2-bd88-41a5-8264-eefd356cc504";
//     const bufferObj = Buffer.from(JSON.stringify(data), "utf8");
//     const base64EncodedPayload = bufferObj.toString("base64");
//     let string = base64EncodedPayload + payEndpoint + SALT_KEY;
//     const concatedString = sha256(string);
//     const xVerify = concatedString + "###" + SALT_INDEX;

//     console.log("xVerify", xVerify);

//     const options = {
//       method: "post",
//       url: `${PHONE_PE_HOST_URL}${payEndpoint}`,
//       headers: {
//         accept: "application/json",
//         "Content-Type": "application/json",
//         "X-VERIFY": xVerify,
//       },
//       data: {
//         request: base64EncodedPayload,
//       },
//     };

//     axios
//       .request(options)
//       .then(function (response) {
//         console.log("response", response.data);
//         // return response.data;
//       })
//       .catch(function (error) {
//         if (error.response) {
//           console.log("Error data:", error.response.data);
//           console.log("Error status:", error.response.status);
//           console.log("Error headers:", error.response.headers);
//         } else {
//           console.error("Error message:", error.message);
//         }
//       });
//   }
// );

// app.post("/payment/validate/:merchantTransactionId", async function (req, res) {
//   // const { merchantTransactionId } = req.params;

//   const PHONE_PE_HOST_URL = "https://api-preprod.phonepe.com/apis/pg-sandbox";
//   const payEndpoint = "/pg/v1/pay";
//   const MERCHANT_ID = "UATM22YJFZ86K7YG";
//   const merchantTransactionId = uniqid();
//   const userId = 123;

//   const SALT_INDEX = 1;
//   const SALT_KEY = "9793d0d2-bd88-41a5-8264-eefd356cc504";
//   if (merchantTransactionId) {
//     let statusUrl =
//       `${PHONE_PE_HOST_URL}/pg/v1/status/${MERCHANT_ID}/` +
//       merchantTransactionId;

//     let string =
//       `/pg/v1/status/${MERCHANT_ID}/` + merchantTransactionId + SALT_KEY;
//     let sha256_val = sha256(string);
//     let xVerifyChecksum = sha256_val + "###" + SALT_INDEX;

//     axios
//       .get(statusUrl, {
//         headers: {
//           "Content-Type": "application/json",
//           "X-VERIFY": xVerifyChecksum,
//           "X-MERCHANT-ID": merchantTransactionId,
//           accept: "application/json",
//         },
//       })
//       .then(function (response) {
//         console.log("response->", response.data);
//         if (response.data && response.data.code === "PAYMENT_SUCCESS") {
//           // redirect to FE payment success status page
//           res.send(response.data);
//         } else {
//           // redirect to FE payment failure / pending status page
//           res.send(response.data);
//         }
//       })
//       .catch(function (error) {
//         // redirect to FE payment failure / pending status page
//         res.send(error);
//       });
//   } else {
//     res.send("Sorry!! Error");
//   }
// });
const allowedPaths = [
  // {
  //   methods: ["POST"],
  //   path: "/sap/action-plan/file/upload/allowedPath",
  // },
];
app.use(unless(decryptRequestMiddleware, allowedPaths));
RegisterRoutes(app);
new Downloadables(app);
app.use(errorMiddleware);
if (process.env.NODE_ENV === "development") {
  server.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
} else {
  httpsServer.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

/** to catch any unhandled promise rejection */
process.on("unhandledRejection", function (err, promise) {
  console.error(
    "Unhandled rejection (promise: ",
    promise,
    ", reason: ",
    err,
    ")."
  );
});
process.on("uncaughtException", function (err, origin) {
  console.error(`Caught exception: ${err}\n` + `Exception origin: ${origin}`);
});

process.on("SIGINT", function () {
  server.close();
  // calling .shutdown allows your process to exit normally
  process.exit();
});
