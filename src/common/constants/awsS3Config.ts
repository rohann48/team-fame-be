// import dotenv from "dotenv";
// dotenv.config();
export const s3Config = {
  bucketName: process.env.STORAGE_BUCKET_NAME, // Your s3 bucket name here
  accessKeyId: process.env.AWS_ACCESSKEYID, // AWS access key id here
  secrectKeyId: process.env.AWS_SECRETKEYID, // AWS secrect key id here
  region: process.env.AWS_REGION, // AWS region here
};
