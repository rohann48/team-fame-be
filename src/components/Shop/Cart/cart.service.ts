import { ClientService } from "../../Clients/client.service";
import Cart from "./cart.model";
import { Types } from "mongoose";

export class CartService {
  async addCart(newCart) {
    const prevCart = await this.getCartByClientId(newCart.clientId);
    let data;
    if (!prevCart) {
      data = await Cart.addCart(newCart);
      await new ClientService().updateClientInfoById(newCart.clientId, {
        cartId: data._id,
      });
    } else {
      data = await this.updateProductCartById(prevCart._id, newCart.products);
    }
    return data;
  }

  async getAllCartList() {
    const data = await Cart.getCartList({});
    return data;
  }

  async getCartById(cartId) {
    const data = await Cart.getCartById(cartId);
    return data;
  }

  async getCartByClientId(clientId) {
    const data = await Cart.getCartByClientId(clientId);
    return data;
  }

  async deleteCartById(cartId) {
    const data = await Cart.deleteCartById(cartId);
    return data;
  }

  async updateProductCartById(cartId, data) {
    const cart = {
      $push: { products: data },
    };
    const result = await this.updateCartById(cartId, cart);
    return result;
  }

  async updateProductQuantityById(clientId, data) {
    const result = await this.getCartByClientId(clientId);
    let product = result.products.find((prod) => {
      return (
        prod.productId._id.toString() === data.products.productId.toString()
      );
    });
    product.quantity = data.products.quantity;
    await result.save();
    return result;
  }

  async removeProductCartById(clientId, productId) {
    const cart = {
      $pull: { products: { productId: new Types.ObjectId(productId) } },
    };
    const result = await this.updateCartByClientId(clientId, cart);
    return result;
  }

  async updateCartByClientId(cartId, data) {
    const result = await Cart.updateCartByClientId(cartId, data);
    return result;
  }

  async updateCartById(cartId, data) {
    const result = await Cart.updateCartById(cartId, data);
    return result;
  }
}
