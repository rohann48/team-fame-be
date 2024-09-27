import { Types } from "mongoose";
import { ClientService } from "../Clients/client.service";
import GoldScheme from "./goldScheme.model";

export class GoldSchemeService {
  async addGoldScheme(newScheme) {
    const data = await GoldScheme.addGoldScheme(newScheme);
    await new ClientService().updateClientInfoById(newScheme.clientId, {
      goldSchemeId: data._id,
    });
    return data;
  }

  async getGoldSchemeList(matchQuery) {
    const data = await GoldScheme.getGoldSchemeList(matchQuery);
    return data;
  }
  async getGoldSchemeAllList(matchQuery) {
    const data = await GoldScheme.getGoldSchemeAllList(matchQuery);
    return data;
  }

  async getGoldSchemeByQuery(clientId) {
    console.log(clientId, "cc");
    const matchQuery = {
      clientId: new Types.ObjectId(clientId),
    };
    console.log(matchQuery, "mat");
    const data = await GoldScheme.getGoldSchemeByQuery(matchQuery);
    return data;
  }

  async updateSchemeById(schemeId, modifiedData) {
    const res = await GoldScheme.updateSchemeById(schemeId, modifiedData);
    return res;
  }

  async updateSchemeInvestmentById(aboutId, data) {
    const modifiedData = {
      year: data.year,
      month: data.month,
      date: new Date(),
      amount: data.amount,
    };
    const res = await GoldScheme.updateSchemeInvestmentById(
      aboutId,
      modifiedData
    );
    return res;
  }
}
