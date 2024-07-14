import Client from "./client.model";
import bcrypt from "bcrypt";
import gravatar from "gravatar";
export class ClientService {
  async userSignup(userData, req) {
    const matchQuery = {
      contactNo: Number(userData.contactNo),
    };
    const selectQuery = { confirmPassword: 0, password: 0 };
    const registerUser = await Client.getOneClientInfo(matchQuery, selectQuery);
    if (registerUser) {
      throw new Error("User already registered");
    }

    try {
      // const avatar = "http://profiles.google.com/s2/photos/profile/" + data.email + "?sz=" + 80;
      const avatar = gravatar.url(userData.email, {
        s: "80",
        r: "pg",
        d: "mm",
      });

      const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      let referralCode = "fame-";
      for (let i = 0; i < 6; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        referralCode += characters[randomIndex];
      }
      userData["referralCode"] = referralCode;
      const user = await Client.addClient(userData);

      //jwt
      const jwtToken = await Client.generateAuthToken(userData);
      // console.log(jwtToken);
      //cookie
      const cookieOptions = {
        httpOnly: true,
        expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), //+days*24hr*60min*60sec*1000ms
      };
      req.res.cookie("authToken", jwtToken, cookieOptions);

      return user;
    } catch (err) {
      throw err;
    }
  }

  async getClientInfoById(clientId) {
    const data = await Client.getClientInfoById(clientId);
    return data;
  }

  async getOneClientInfo(matchQuery, selectQuery) {
    const data = await Client.getOneClientInfo(matchQuery, selectQuery);
    return data;
  }

  async getClientsByQuery(matchQuery = {}) {
    const data = await Client.getClientsByQuery(matchQuery);
    return data;
  }

  async updateClientInfoById(clientId, modifiedData) {
    const data = await Client.updateClientInfoById(clientId, modifiedData);
    return data;
  }

  async deleteClientById(clientId) {
    const data = await Client.deleteClientById(clientId);
    return data;
  }

  async authenticateUser(userData, req) {
    const matchQuery = {
      contactNo: Number(userData.contactNo),
    };

    const selectQuery = { confirmPassword: 0, referralCode: 0 };
    const userInfo = await this.getOneClientInfo(matchQuery, selectQuery);

    if (!userInfo) {
      throw new Error("Invalid contactNo or password");
    }
    const match = await bcrypt.compare(userData.password, userInfo.password);
    if (!match) {
      throw new Error("Invalid contactNo or password");
    }
    //jwt
    const jwtToken = await Client.generateAuthToken(userInfo);
    console.log(jwtToken);
    //cookie
    const cookieOptions = {
      httpOnly: true,
      expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), //+days*24hr*60min*60sec*1000ms
    };
    if (!userInfo?.["goldSchemeId"]) {
      userInfo["goldSchemeId"] = null;
    }
    req["session"].userInfo = userInfo.toObject();
    req.res.cookie("authToken", jwtToken, cookieOptions);
    return {
      _id: userInfo._id,
      name: userInfo.name,
      lastName: userInfo.lastName,
      role: userInfo.role,
      contactNo: userInfo.contactNo,
      emailId: userInfo.emailId,
      goldSchemeId: userInfo?.["goldSchemeId"],
    };
    // res.send(token)
  }
}
