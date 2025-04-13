import { emailNotificationEnum } from "../../common/constants/emailDesign.enum";
import emailNotification from "../../common/functions/notificationHelper";

export class EmailService {
  async sendEmail(data) {
    try {
      let clients = data.to;
      let messsageHtml = emailNotificationEnum.MAIL_SERVICE(data.message, "");
      const emailData = await emailNotification(
        clients,
        messsageHtml,
        data.subject,
        [data.cc]
      );
    } catch (error) {
      throw error;
    }
  }
}
