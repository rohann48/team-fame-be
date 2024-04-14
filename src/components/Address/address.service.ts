import Address from "./address.model";

export class AddressService {
  async addAddress(newAddress) {
    const Data = await Address.addAddress(newAddress);
    return Data;
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
