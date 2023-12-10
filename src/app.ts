import express, { Response as ExResponse, Request as ExRequest } from "express";
import cors from "cors";
import mongoose from "mongoose";
import http from "http";
import dotenv from "dotenv";
dotenv.config();
import { RegisterRoutes } from "../build/routes";
import swaggerUi from "swagger-ui-express";
import { decryptRequestMiddleware } from "./common/middlewares/decryptRequestMiddleware";
import { unless } from "./api/middlewares/allowedPaths.middleware";
import { errorMiddleware } from "./api/middlewares";
import { Downloadables } from "./components/Downloadables/downloadables.controller";


const hpp = require("hpp");
const helmet = require("helmet");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const app = express();


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
  collection: "suppliersessions",
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
const server = new http.Server(app);
app.use(
  "/scm/docs",
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
const allowedPaths = [
  {
    methods: ["POST"],
    path: "/sap/action-plan/file/upload/allowedPath",
  },
];
app.use(unless(decryptRequestMiddleware, allowedPaths));
RegisterRoutes(app);
new Downloadables(app);
app.use(errorMiddleware);

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

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
