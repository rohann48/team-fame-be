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
  Delete,
  Security,
} from "tsoa";
import express from "express";
import { HttpResponseMessage } from "../../common/constants/httpResponseMessage.enum";
import { HttpException, HttpSuccess } from "../../common/helpers/HttpResponse";
import { ClientService } from "./client.service";
import jwt from "jsonwebtoken";

@Tags("Clients")
@Route("tf/client")
export class ClientController extends Controller {
  @SuccessResponse(200, HttpResponseMessage.FETCHED)
  // @Security("authenticate")
  @Get()
  public async getClientsByQuery() {
    try {
      const matchQuery = { isSuperAdmin: { $ne: true } };
      const data = await new ClientService().getClientsByQuery(matchQuery);
      return new HttpSuccess(HttpResponseMessage.FETCHED, data);
    } catch (error) {
      console.log(error);
      throw new HttpException(400, error);
    }
  }

  @SuccessResponse(201, HttpResponseMessage.CREATED)
  @Post("/sign-up")
  public async createActionPlanForSupplier(
    @Request() req: express.Request,
    @Body() newData
  ) {
    try {
      const doc = await new ClientService().userSignup(newData, req);
      return new HttpSuccess(HttpResponseMessage.CREATED, doc);
    } catch (error) {
      let err: any = error;
      if (err.code === 11000) {
        return err;
      } else throw new HttpException(400, err, err?.message);
    }
  }

  @SuccessResponse(200, HttpResponseMessage.FETCHED)
  @Security("authenticate")
  @Put("{clientId}")
  public async updateAboutUsId(@Path() clientId, @Body() modifiedData) {
    try {
      const data = await new ClientService().updateClientInfoById(
        clientId,
        modifiedData
      );
      return new HttpSuccess(HttpResponseMessage.FETCHED, data);
    } catch (error) {
      console.log(error);
      throw new HttpException(400, error);
    }
  }

  @SuccessResponse(200, HttpResponseMessage.DELETED)
  @Security("authenticate")
  @Delete("delete/{clientId}")
  public async deleteAboutUsById(@Path() clientId) {
    try {
      const data = await new ClientService().deleteClientById(clientId);
      return new HttpSuccess(HttpResponseMessage.DELETED, data);
    } catch (error) {
      console.log(error);
      throw new HttpException(400, error);
    }
  }

  @SuccessResponse(201, HttpResponseMessage.CREATED)
  @Post("/auth")
  public async authenticateUser(
    @Request() req: express.Request,
    @Body() userData
  ) {
    try {
      const userInfo = await new ClientService().authenticateUser(
        userData,
        req
      );
      return new HttpSuccess(HttpResponseMessage.CREATED, userInfo);
    } catch (error: any) {
      console.log(error);

      throw new HttpException(400, error, error?.message);
    }
  }

  @SuccessResponse("200", HttpResponseMessage.FETCHED)
  @Get("auth/check")
  public async validateAuthenticationCheck(@Request() req: express.Request) {
    try {
      let response;
      /**returning user info, if the user has a session  */
      const token = req.cookies.authToken;
      // if (!token) throw new HttpException(400, "Unauthorized");

      if (token) {
        // console.log("session", req["session"]["userInfo"]);
        const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY);
        // console.log("decodeddd", decoded);

        const data = await new ClientService().getClientInfoById(
          decoded["_id"]
        );

        response = {
          userInfo: {
            ...data.toObject(),
          },
        };
      } else {
        response = null;
      }
      return new HttpSuccess(HttpResponseMessage.FETCHED, response);
    } catch (error) {
      throw new HttpException(400, error);
    }
  }

  @SuccessResponse(201, HttpResponseMessage.CREATED)
  @Get("/auth/logout")
  public async logoutUser(@Request() req: express.Request, @Query() clientId?) {
    try {
      await new Promise((resolve, reject) => {
        req.session.destroy((err) => {
          if (err) {
            console.error("Failed to destroy session:", err);
            return reject(new HttpException(500, "Logout failed"));
          }

          // Clear cookies
          req.res?.clearCookie("sessionId");
          req.res?.clearCookie("authToken");

          resolve(true);
        });
      });

      return new HttpSuccess(HttpResponseMessage.UPDATED, true);
    } catch (error) {
      console.log("Logout error:", error);
      throw new HttpException(
        400,
        error instanceof Error ? error.message : String(error)
      );
    }
  }
  //get single user
  @SuccessResponse(201, HttpResponseMessage.CREATED)
  @Get("/clientId")
  public async getClientById(
    @Request() req: express.Request,
    @Query() clientId: string
  ) {
    try {
      const userInfo = req.session["userInfo"];
      // console.log(userInfo);
      const data = await new ClientService().getClientInfoById(clientId);
      return new HttpSuccess(HttpResponseMessage.FETCHED, data);
    } catch (error) {
      console.log(error);
      throw new HttpException(400, error);
    }
  }

  @SuccessResponse(201, HttpResponseMessage.CREATED)
  @Get("/membership")
  public async getClientMembership(
    @Request() req: express.Request,
    @Query() clientId: string
  ) {
    try {
      const matchQuery = {
        _id: clientId,
      };
      const selectQuery = { membership: 1 };
      const data = await new ClientService().getOneClientInfo(
        matchQuery,
        selectQuery
      );
      return new HttpSuccess(HttpResponseMessage.FETCHED, data);
    } catch (error) {
      console.log(error);
      throw new HttpException(400, error);
    }
  }
}
