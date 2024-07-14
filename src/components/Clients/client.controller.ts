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

@Tags("Clients")
@Route("tf/client")
export class ClientController extends Controller {
  @SuccessResponse(200, HttpResponseMessage.FETCHED)
  @Security("authenticate")
  @Get()
  public async getClientsByQuery() {
    try {
      const data = await new ClientService().getClientsByQuery({});
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
      console.log(modifiedData);
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
    } catch (error) {
      console.log(error);

      throw new HttpException(400, error);
    }
  }

  @SuccessResponse("200", HttpResponseMessage.FETCHED)
  @Get("auth/check")
  public async validateAuthenticationCheck(@Request() req: express.Request) {
    try {
      let response;
      /**returning user info, if the user has a session  */
      if (req["session"]["userInfo"]) {
        response = {
          userInfo: {
            contactNo: req["session"]["userInfo"].contactNo,
            emailId: req["session"]["userInfo"].emailId,
            lastName: req["session"]["userInfo"].lastName,
            membership: req["session"]["userInfo"].membership,
            name: req["session"]["userInfo"].name,
            role: req["session"]["userInfo"].role,
            _id: req["session"]["userInfo"]._id,
            goldSchemeId: req["session"]["userInfo"]?.goldSchemeId,
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
      // req["session"].destroy()
      let isLogoutSuccess = true;
      req["session"].destroy((err) => {
        if (err) {
          isLogoutSuccess = true;
        }
      });
      req.res.clearCookie("sessionID");
      req.res.clearCookie("authToken");
      return new HttpSuccess(HttpResponseMessage.CREATED, true);
    } catch (error) {
      console.log(error);

      throw new HttpException(400, error);
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
      console.log(userInfo);
      const data = await new ClientService().getClientInfoById(clientId);
      return new HttpSuccess(HttpResponseMessage.FETCHED, data);
    } catch (error) {
      console.log(error);
      throw new HttpException(400, error);
    }
  }
}
