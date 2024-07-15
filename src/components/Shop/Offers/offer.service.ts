import Offers from "./offer.model";
export class OfferService {
  async addOfferRefferalCode(newScheme) {
    const prevData = await this.getRefferalCodeList({});
    let data;
    if (prevData.length > 0) {
      data = await this.updateOfferRefferalById(prevData[0]._id, {
        refferalCodes: newScheme.refferalCodes[0],
      });
    } else {
      data = await Offers.addOfferRefferalCode(newScheme);
    }
    return data;
  }

  async getRefferalCodeList(matchQuery) {
    const data = await Offers.getRefferalCodeList(matchQuery);
    return data;
  }

  async validateRefferalCode(code) {
    const data = await this.getRefferalCodeList({});
    if (data[0].appliedCodes.includes(code)) {
      return false;
    } else {
      return true;
    }
    // else {
    //   await this.updateOfferRefferalById(data[0]._id, { appliedCodes: code });
    //   return true;
    // }
  }

  async updateAppliedCode(code) {
    const data = await this.getRefferalCodeList({});
    await this.updateOfferRefferalById(data[0]._id, { appliedCodes: code });
    return true;
  }

  async updateOfferRefferalById(docId, modifiedData) {
    const data = { $push: modifiedData };
    const res = await Offers.updateOfferRefferalById(docId, data);
    return res;
  }
}
