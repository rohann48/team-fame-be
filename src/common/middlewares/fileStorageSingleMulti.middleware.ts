import { s3File } from "../functions/s3File";

export class FileUploadSingleMutliMiddleWare {
  // docID refers to id being sent, cn be any id.companyId doc id etc
  async addFile(fileDetails, docId) {
    try {
      return await this.awsAddFile(fileDetails, docId);
    } catch (error) {
      throw error;
    }
  }

  //FILE ADD FOR AWS_S3
  private async awsAddFile(fileDetails, docId) {
    try {
      let res;
      //check whether file is Array or object and call the method accordingly
      if (Array.isArray(fileDetails.fileToUpload)) {
        res = await this.awsMultipleFileAdd(fileDetails, docId);
      } else {
        res = await this.awsSingleFileAdd(fileDetails, docId);
      }
      return res;
    } catch (error) {
      throw error;
    }
  }

  /**for the single file Add */
  private async awsSingleFileAdd(fileDetails, docId) {
    try {
      /**adding the uploaded file to our database */
      async function addFileDataToDatabase(name, key, path) {
        try {
          const fileInfo = {
            name: name,
            Key: key,
            path: path,
            date: new Date(),
          };
          // console.log("fileInfo", fileInfo);

          return fileInfo;
        } catch (error) {
          throw error;
        }
      }

      /**adding the file to AWS S3 */
      const fileUploadToS3 = await new s3File().addFile(
        fileDetails.fileToUpload.originalFilename,
        fileDetails.fileToUpload.filepath,
        docId,
        addFileDataToDatabase
      );

      return fileUploadToS3;
    } catch (error) {
      throw error;
    }
  }

  //multiple files upload for aws

  private async awsMultipleFileAdd(fileDetails, docId) {
    try {
      let fileInfoArr = [];
      /**adding the uploaded file to our database */
      async function addFileDataToDatabase(name, key, path) {
        try {
          const fileInfo = {
            name: name,
            Key: key,
            path: path,
            date: new Date(),
          };

          return fileInfo;
        } catch (error) {
          throw error;
        }
      }

      for (let i = 0; i < fileDetails.fileToUpload.length; i++) {
        /**adding the file to AWS S3 */
        const fileUploadToS3 = await new s3File().addFile(
          fileDetails.fileToUpload[i].originalFilename,
          fileDetails.fileToUpload[i].filepath,
          docId,
          addFileDataToDatabase
        );
        //push the fileinfo to fileInfoArr variable
        fileInfoArr.push(fileUploadToS3);
      }

      return fileInfoArr;
    } catch (error) {
      throw error;
    }
  }
}
