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
  public async updateAboutUsId(@Path() clientId, @Query() modifiedData) {
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
    } catch (error) {
      console.log(error);

      throw new HttpException(400, error);
    }
  }
}
