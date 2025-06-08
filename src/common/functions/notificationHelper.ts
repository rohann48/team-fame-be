import { poolData } from "../constants/cognitoConfig";
import { s3Config } from "../constants/awsS3Config";

//new promise

const emailNotification = (
  clientsForNotification,
  data,
  subject,
  cc?,
  bcc?
) => {
  // Load the AWS SDK for Node.js
  let AWS = require("aws-sdk");
  // Set the region
  AWS.config.update({
    region: poolData.region,
    accessKeyId: s3Config.accessKeyId,
    secretAccessKey: s3Config.secrectKeyId,
  });

  return new Promise(async (resolve, reject) => {
    try {
      // Create sendEmail params
      let params = {
        Destination: {
          /* required */
          ...(cc && { CcAddresses: cc }),
          // [

          /* more items */
          // ],
          ToAddresses: clientsForNotification,
          ...(bcc && { BccAddresses: bcc }),
        },
        Message: {
          /* required */
          Body: {
            /* required */
            Html: {
              Charset: "UTF-8",
              Data: data.htmlCode,
            },
            // Text: {
            //   Charset: "UTF-8",
            //   Data: "You have opted for the message",
            // },
          },
          Subject: {
            Charset: "UTF-8",
            Data: subject,
          },
        },
        Source: "support@team-fame.com" /* required */,
        ReplyToAddresses: [
          // "EMAIL_ADDRESS",
          /* more items */
        ],
      };
      let sendPromise = await new AWS.SES({
        apiVersion: "2010-12-01",
      }).sendEmail(params, async function (err, data) {
        try {
          if (err) {
            reject(err);
          }
          const res = data;
          resolve(true);
          // console.log("res", res);
        } catch (error) {
          throw error;
        }
      });
    } catch (error) {
      throw error;
    }
  });
};
export default emailNotification;
