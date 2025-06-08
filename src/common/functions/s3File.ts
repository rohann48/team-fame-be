import { s3Config } from "../constants/awsS3Config";
const fs = require("fs");
const AWS = require("aws-sdk");
import { Request, Response, Express } from "express";
import fileNameGen from "../functions/fileNameGen";
/**common file service used for adding,deleting file to S3 */

export class s3File {
  /**adding the file to s3 */
  async addFile(originalFilename, filePath, docId, addFileDataToEntry) {
    return new Promise((resolve, reject) => {
      try {
        // console.log("s3Config", s3Config);

        // Initializing S3 Interface
        const s3 = new AWS.S3({
          accessKeyId: s3Config.accessKeyId,
          secretAccessKey: s3Config.secrectKeyId,
        });

        const fileContent = fs.readFileSync(filePath);

        let fileName = fileNameGen(originalFilename);
        const params = {
          Bucket: s3Config.bucketName,
          Key: `${docId}_${fileName}`, // file name you want to save as
          Body: fileContent,
        };

        // Uploading files to the bucket
        s3.upload(params, async function (err, data) {
          if (err) {
            reject(err);

            throw err;
          }

          const res = await addFileDataToEntry(
            originalFilename,
            data.Key,
            data.Location
          );
          resolve(res);
        });
      } catch (error) {
        reject(error);
        throw error;
      }
    });
  }
  /**deleting the file to s3 */
  async deleteFile(delFileList, deleteFileFromTrackedData?) {
    return new Promise((resolve, reject) => {
      try {
        // Initializing S3 Interface
        const s3 = new AWS.S3({
          accessKeyId: s3Config.accessKeyId,
          secretAccessKey: s3Config.secrectKeyId,
        });

        const params = {
          Bucket: s3Config.bucketName,
          Delete: {
            // required
            Objects:
              // required
              delFileList,
          },
        };
        s3.deleteObjects(params, async function (err, data) {
          if (err) {
            reject(err);
          }
          // an error occurred
          else {
            if (deleteFileFromTrackedData) {
              const del = await deleteFileFromTrackedData();
              resolve(del);
            } else {
              resolve(true);
            }
          } // successful response
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  /**downloading the s3 file by providing the KEY of the uploaded file*/
  async downloadS3File(req: Request, res: Response) {
    try {
      // Initializing S3 Interface
      const s3 = new AWS.S3({
        accessKeyId: s3Config.accessKeyId,
        secretAccessKey: s3Config.secrectKeyId,
        region: s3Config.region,
      });

      const fileKey = `${req.params.key}`;
      const options = {
        Bucket: s3Config.bucketName,
        Key: fileKey,
      };

      res.attachment(fileKey);
      var fileStream = s3.getObject(options).createReadStream();
      fileStream.pipe(res);
    } catch (error) {
      console.log(error);

      throw error;
    }
  }

  /**downloading the s3 file by file  KEY*/
  async downloadS3FileByKEY(req: Request, res: Response, fileKey) {
    try {
      // Initializing S3 Interface
      const s3 = new AWS.S3({
        accessKeyId: s3Config.accessKeyId,
        secretAccessKey: s3Config.secrectKeyId,
        region: s3Config.region,
      });

      const options = {
        Bucket: s3Config.bucketName,
        Key: fileKey,
      };

      res.attachment(fileKey);
      var fileStream = s3.getObject(options).createReadStream();
      fileStream.pipe(res);
    } catch (error) {
      throw error;
    }
  }
  async deleteFileOnlyFromS3(delFileKey) {
    return new Promise((resolve, reject) => {
      try {
        // Initializing S3 Interface
        const s3 = new AWS.S3({
          accessKeyId: process.env.AWS_ACCESSKEYID,
          secretAccessKey: process.env.AWS_SECRETKEYID,
        });

        const params = {
          Bucket: s3Config.bucketName,
          Delete: {
            // required
            Objects:
              // required
              [{ Key: delFileKey }],
          },
        };
        s3.deleteObjects(params, async function (err, data) {
          if (err) {
            reject(err);
          }
          // an error occurred
          else {
            resolve(data);
          } // successful response
        });
      } catch (error) {
        reject(error);
      }
    });
  }
}
