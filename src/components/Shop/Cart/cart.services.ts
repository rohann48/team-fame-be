import Cart from "./cart.model";

export class CartService {
  async addCart(newCart) {
    const Data = await Cart.addCart(newCart);
    return Data;
  }

  async getAllCartList() {
    const data = await Cart.getCartList({});
    return data;
  }

  async getCartById(cartId) {
    const data = await Cart.getCartById(cartId);
    return data;
  }

  async deleteCartById(cartId) {
    const data = await Cart.deleteCartById(cartId);
    return data;
  }
}
