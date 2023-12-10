import dotenv from "dotenv";
dotenv.config();

/**cognito config file */
export const cognitoAuthConfig = {
    region: process.env.AWS_REGION,
    userPoolId: process.env.COGNITO_POOL_ID,
    userPoolWebClientId: process.env.COGNITO_CLIENT_ID,
};

/** for email */
export const cognitoConfigSdk = {
    accessKeyId: process.env.AWS_ACCESSKEYID,
    secretAccessKey: process.env.AWS_SECRETKEYID,
    region: process.env.AWS_REGION,
};
