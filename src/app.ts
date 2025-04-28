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
import Razorpay from "razorpay";
import path from "path";
const {
  validateWebhookSignature,
} = require("razorpay/dist/utils/razorpay-utils");

const hpp = require("hpp");
const helmet = require("helmet");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const app = express();

// const razorpay = new Razorpay({
//   key_id: "rzp_test_r9hvBaKkE60YZL",
//   key_secret: "somHnOxw3Tjfj8RHqFf14Js7",
// });

// const razorpay = new Razorpay({
//   key_id: "rzp_test_8UqYGrFyKHxYJz",
//   key_secret: "WUbKN0DYOagsKkIHchm3HRvM",
// });

let credentials = {};
// if (process.env.NODE_ENV !== "development") {
//   // Certificate
//   const privateKey = fs.readFileSync(
//     "/etc/letsencrypt/live/team-fame.com/privkey.pem",
//     "utf8"
//   );
//   const certificate = fs.readFileSync(
//     "/etc/letsencrypt/live/team-fame.com/cert.pem",
//     "utf8"
//   );
//   const ca = fs.readFileSync(
//     "/etc/letsencrypt/live/team-fame.com/chain.pem",
//     "utf8"
//   );

//   credentials = {
//     key: privateKey,
//     cert: certificate,
//     ca: ca,
//   };
// }

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
  // httpsServer = new https.Server(credentials, app);
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

// Function to read data from JSON file
const readData = () => {
  // if (fs.existsSync("orders.json")) {
  //   const data = fs.readFileSync("orders.json");
  //   const jsonString = data.toString("utf-8");
  //   const jsonObject = JSON.parse(jsonString);
  //   return jsonObject;
  // }
  return [];
};

// Function to write data to JSON file
const writeData = (data) => {
  fs.writeFileSync("orders.json", JSON.stringify(data, null, 2));
};

// Initialize orders.json if it doesn't exist
if (!fs.existsSync("orders.json")) {
  writeData([]);
}

// Route to handle order creation
// app.post("/create-order", async (req, res) => {
//   try {
//     const { amount, currency, receipt, notes } = req.body;
//     const options = {
//       amount: amount * 100, // Convert amount to paise
//       currency,
//       receipt,
//       notes,
//     };

//     const order = await razorpay.orders.create(options);

//     // Read current orders, add new order, and write back to the file
//     const orders = [];
//     orders.push({
//       order_id: order.id,
//       amount: order.amount,
//       currency: order.currency,
//       receipt: order.receipt,
//       status: "created",
//     });
//     // writeData(orders);

//     res.json(order); // Send order details to frontend, including order ID
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Error creating order");
//   }
// });

// Route to serve the success page
// app.get("/payment-success", (req, res) => {
//   res.sendFile(path.join(__dirname, "success.html"));
// });

// Route to handle payment verification
// app.post("/verify-payment", (req, res) => {
//   const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
//     req.body;

//   const secret = razorpay;
//   const body = razorpay_order_id + "|" + razorpay_payment_id;

//   try {
//     const isValidSignature = validateWebhookSignature(
//       body,
//       razorpay_signature,
//       secret
//     );
//     if (isValidSignature) {
//       // Update the order with payment details
//       const orders = readData();
//       const order = orders.find((o) => o.order_id === razorpay_order_id);
//       if (order) {
//         order.status = "paid";
//         order.payment_id = razorpay_payment_id;
//         writeData(orders);
//       }
//       res.status(200).json({ status: "ok" });
//       console.log("Payment verification successful");
//     } else {
//       res.status(400).json({ status: "verification_failed" });
//       console.log("Payment verification failed");
//     }
//   } catch (error) {
//     console.error(error);
//     res
//       .status(500)
//       .json({ status: "error", message: "Error verifying payment" });
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

// greenlock.listen(443, () => {
//   console.log("Greenlock HTTPS server running on port");
// });
// greenlock.serve(app);
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
  if (process.env.NODE_ENV === "development") {
    server.close();
  } else {
    httpsServer.close();
  }
  // greenlock.close();
  // calling .shutdown allows your process to exit normally
  process.exit();
});
