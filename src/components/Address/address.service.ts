import { ClientService } from "../Clients/client.service";
import Address from "./address.model";

export class AddressService {
  async addAddress(newAddress) {
    const data = await Address.addAddress(newAddress);
    const modifiedData = {
      addressId: data._id,
    };
    await new ClientService().updateClientInfoById(
      newAddress.clientId,
      modifiedData
    );
    return data;
  }

  async getAllAddressList() {
    const data = await Address.getAddressList({});
    return data;
  }

  async getAddressById(testimonialId) {
    const data = await Address.getAddressById(testimonialId);
    return data;
  }

  async deleteAddressById(testId) {
    const data = await Address.deleteAddressById(testId);
    return data;
  }
}
