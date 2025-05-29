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
    const matchQuery = {
      clientId: new Types.ObjectId(clientId),
    };
    // console.log(matchQuery, "mat");
    const data = await GoldScheme.getGoldSchemeByQuery(matchQuery);
    return data;
  }

  async updateSchemeById(schemeId, modifiedData) {
    const res = await GoldScheme.updateSchemeById(schemeId, modifiedData);
    return res;
  }

  async updateInvestmentById(schemeId, razorOrderId, modifiedData) {
    const res = await GoldScheme.updateInvestmentById(
      schemeId,
      razorOrderId,
      modifiedData
    );
    return res;
  }

  async updateSchemeInvestmentById(aboutId, data) {
    const modifiedData = {
      year: data.year,
      month: data.month,
      date: new Date(),
      amount: data.amount,
      type: "NonRefundable",
      razorOrderId: data.razorOrderId,
    };
    const res = await GoldScheme.updateSchemeInvestmentById(
      aboutId,
      modifiedData
    );
    return res;
  }
  // async addGoldSchemeManually(newScheme) {
  //   const macthQuery = {
  //     contactNo: Number(newScheme.mobileNumber),
  //   };
  //   const selectQuery = {
  //     goldSchemeId: 1,
  //   };
  //   const getClientInfo = await new ClientService().getOneClientInfo(
  //     macthQuery,
  //     selectQuery
  //   );

  //   // Format the investment based on schema
  //   const date = new Date(newScheme.startDate);
  //   const month = date.getMonth() + 1; // Months are zero-based in JavaScript
  //   const year = date.getFullYear();
  //   const investment = {
  //     date: new Date(newScheme.startDate),
  //     year: year,
  //     month: month,
  //     amount: Number(newScheme.investmentAmount),
  //     type: newScheme.schemeType,
  //   };

  //   if (!getClientInfo.goldSchemeId) {
  //     const schemeData = {
  //       clientId: getClientInfo._id,
  //       period: Number(newScheme.period),
  //       startDate: new Date(newScheme.startDate),
  //       endDate: new Date(newScheme.endDate),
  //       investments: [investment],
  //     };
  //     const data = await GoldScheme.addGoldScheme(schemeData);
  //     // Update client with the new gold scheme ID
  //     await new ClientService().updateClientInfoById(getClientInfo._id, {
  //       goldSchemeId: data._id,
  //     });
  //     return data;
  //   } else {
  //     // Client already has a gold scheme, add new investment to existing scheme
  //     const updatedScheme = await GoldScheme.findByIdAndUpdate(
  //       getClientInfo.goldSchemeId,
  //       { $push: { investments: investment } },
  //       { new: true }
  //     );
  //     return updatedScheme;
  //   }
  // }
  async addGoldSchemeManually(newScheme) {
    const matchQuery = {
      contactNo: Number(newScheme.mobileNumber),
    };
    const selectQuery = {
      goldSchemeId: 1,
      membership: 1,
    };
    const getClientInfo = await new ClientService().getOneClientInfo(
      matchQuery,
      selectQuery
    );

    if (!getClientInfo) {
      throw new Error("Client not found with the provided mobile number.");
    }
    const date = new Date(newScheme.startDate);
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const investment = {
      date,
      year,
      month,
      amount: Number(newScheme.investmentAmount),
      type: newScheme.schemeType,
    };

    let result;

    if (!getClientInfo.goldSchemeId) {
      const schemeData: any = {
        clientId: getClientInfo._id,
        startDate: new Date(newScheme.startDate),
        investments: [investment],
      };

      // Only include period & endDate for NonRefundable schemes
      if (newScheme.schemeType === "NonRefundable") {
        schemeData.period = Number(newScheme.period);
        schemeData.endDate = new Date(newScheme.endDate);
      }

      const data = await GoldScheme.addGoldScheme(schemeData);

      await new ClientService().updateClientInfoById(getClientInfo._id, {
        goldSchemeId: data._id,
      });

      // Populate the client data before returning
      result = await GoldScheme.findById(data._id).populate(
        "clientId",
        "name contactNo"
      );
    } else {
      const updatedScheme = await GoldScheme.findByIdAndUpdate(
        getClientInfo.goldSchemeId,
        { $push: { investments: investment } },
        { new: true }
      ).populate("clientId", "name contactNo");

      result = updatedScheme;
    }

    return result;
  }
}
