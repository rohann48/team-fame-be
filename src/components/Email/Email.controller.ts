import { Controller, Post, Body, Route, SuccessResponse, Tags } from "tsoa";
import { HttpResponseMessage } from "../../common/constants/httpResponseMessage.enum";
import { HttpException, HttpSuccess } from "../../common/helpers/HttpResponse";
import { EmailService } from "./Email.service";

@Tags("Email Service")
@Route("tf/emailtrigger")
export class EmailController extends Controller {
  @SuccessResponse(201, HttpResponseMessage.CREATED)
  @Post()
  public async sendMail(@Body() emailData) {
    try {
      // if (emailData.code === 8765) {
      let email = await new EmailService().sendEmail(emailData);
      this.setStatus(200);
      return new HttpSuccess(HttpResponseMessage.CREATED, email);
      // }
    } catch (error) {
      throw new HttpException(400, error);
    }
  }
}
