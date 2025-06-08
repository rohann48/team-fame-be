import Client from "./client.model";
import bcrypt from "bcrypt";
import gravatar from "gravatar";
import { OfferService } from "../Shop/Offers/offer.service";
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
      // const avatar = gravatar.url(userData.email, {
      //   s: "80",
      //   r: "pg",
      //   d: "mm",
      // });

      const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      let referralCode = "fame-";
      for (let i = 0; i < 6; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        referralCode += characters[randomIndex];
      }
      userData["referralCode"] = referralCode;
      const referral = {
        refferalCodes: [referralCode],
      };
      await new OfferService().addOfferRefferalCode(referral);
      if (!userData["shopVoucher"]) {
        userData["shopVoucher"] = {};
      }
      userData["shopVoucher"] = {
        invitedRefferal: userData.invitedRefferal,
      };
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
    try {
      const data = await Client.getOneClientInfo(matchQuery, selectQuery);
      return data.toObject();
      // clientInfo: data.clientInfo.toObject(),
    } catch (error) {
      console.log("err", error);
    }
  }

  async getClientsByQuery(matchQuery = {}) {
    const selectQuery = {
      name: 1,
      lastName: 1,
      contactNo: 1,
      emailId: 1,
      role: 1,
      membership: 1,
      goldSchemeId: 1,
      referralCode: 1,
      shopVoucher: 1,
    };
    const data = await Client.getClientsByQuery(matchQuery, selectQuery);
    return data;
  }

  async updateClientInfoById(clientId, modifiedData) {
    const data = await Client.updateClientInfoById(clientId, modifiedData);
    return data;
  }

  async updateClientMembership(clientId) {
    const data = await this.getClientInfoById(clientId);
    if (!data.membership) {
      data.membership = true;
      await data.save();
    }
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
    let userObj = { ...userInfo };
    if (!userObj) {
      throw new Error("Invalid contactNo or password");
    }
    const match = await bcrypt.compare(userData.password, userObj.password);
    if (!match) {
      throw new Error("Invalid contactNo or password");
    }
    //jwt
    const jwtToken = await Client.generateAuthToken(userObj);
    // console.log(jwtToken);
    //cookie
    const cookieOptions = {
      httpOnly: true,
      expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), //+days*24hr*60min*60sec*1000ms
    };
    if (!userObj?.["goldSchemeId"]) {
      userObj["goldSchemeId"] = null;
    }
    req["session"].userInfo = userObj;
    req.res.cookie("authToken", jwtToken, cookieOptions);
    //need to check
    return {
      _id: userObj._id,
      name: userObj.name,
      lastName: userObj.lastName,
      role: userObj.role,
      contactNo: userObj.contactNo,
      emailId: userObj.emailId,
      membership: userObj.membership,
      goldSchemeId: userObj?.["goldSchemeId"],
      shopVoucher: userObj.shopVoucher,
      nominee: userObj.nominee || null,
    };
    // res.send(token)
  }
}
