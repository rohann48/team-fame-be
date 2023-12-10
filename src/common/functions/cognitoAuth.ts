import { Amplify, Auth } from "aws-amplify";
import { cognitoAuthConfig } from "../constants/authentication";
import { cryptoEncryptionAes } from "./cryptoEncryptDecrypt";

Amplify.configure({
    Auth: cognitoAuthConfig,
});

export class CognitoAuthentication {
    /**cognito sign method using Amplify */
    public async cognitoSignIn(email, password) {
        try {
            const user = await Auth.signIn(email, password);
            return user;
        } catch (error) {
            throw error;
        }
    }

    /**cognito sign out method */
    public async cognitoSignOut() {
        try {
            const user = await Auth.signOut();
            return user;
        } catch (error) {
            throw error;
        }
    }

    /**cognito forgot password method */
    public async cognitoForgotPassword(client) {
        try {
            /**sending confirmation code to user */
            /**with random generated password */
            // const password = await password_generator(12);
            const clientMetadata = {
                password: "Updapt@1234",
                username: `${client?.name}`,
                baseUrl: `${process.env.BASE_URL}/sap`,
                encodedData: encodeURIComponent(
                    cryptoEncryptionAes({
                        password: "Updapt@1234",
                        email: client?.email,
                        // companyId: client?.assignedCompany,
                    })
                ),
            };
            const forgotPassword = await Auth.forgotPassword(
                client?.email,
                clientMetadata
            );
            return forgotPassword;
        } catch (error) {
            throw error;
        }
    }

    /**confirm user using code and save new password */
    public async cognitoForgotPasswordConfirmation(email, code, newPassWord) {
        try {
            const confirm = await Auth.forgotPasswordSubmit(email, code, newPassWord);
            return confirm;
        } catch (error) {
            throw error;
        }
    }

    /**change password*/
    public async changeUserPassword(user, oldPassword, newPassWord) {
        try {
            const changePassword = await Auth.changePassword(
                user,
                oldPassword,
                newPassWord
            );
            return changePassword;
        } catch (error) {
            throw error;
        }
    }
}
