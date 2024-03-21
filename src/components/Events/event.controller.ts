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
} from "tsoa";
import express from "express";
import { HttpResponseMessage } from "../../common/constants/httpResponseMessage.enum";
import { HttpException, HttpSuccess } from "../../common/helpers/HttpResponse";
import { NewEventparams } from "./event.interface";
import { EventService } from "./event.service";

@Tags("Events")
@Route("tf/event")
export class EventController extends Controller {
  @SuccessResponse(200, HttpResponseMessage.FETCHED)
  @Get()
  public async getEvents() {
    try {
      const data = await new EventService().getAllEventList();
      return new HttpSuccess(HttpResponseMessage.FETCHED, data);
    } catch (error) {
      throw new HttpException(400, error);
    }
  }

  @SuccessResponse(201, HttpResponseMessage.CREATED)
  @Post()
  public async createEvent(
    @Request() req: express.Request,
    @Body() newEvent: NewEventparams
  ) {
    try {
      const event = await new EventService().addEvent(newEvent);
      return new HttpSuccess(HttpResponseMessage.CREATED, event);
    } catch (error) {
      let err: any = error;
      //   if (err.code === 11000) {
      //     return err;
      //   } else throw new HttpException(400, err, err?.message);
    }
  }

  @SuccessResponse(200, HttpResponseMessage.FETCHED)
  @Get("{eventId}")
  public async getEventById(@Path() eventId) {
    try {
      const data = await new EventService().getEventById(eventId);
      return new HttpSuccess(HttpResponseMessage.FETCHED, data);
    } catch (error) {
      throw new HttpException(400, error);
    }
  }

  @SuccessResponse(200, HttpResponseMessage.DELETED)
  @Get("delete/{eventId}")
  public async deleteEventById(@Path() eventId) {
    try {
      const data = await new EventService().deleteEventById(eventId);
      return new HttpSuccess(HttpResponseMessage.DELETED, data);
    } catch (error) {
      throw new HttpException(400, error);
    }
  }
}
