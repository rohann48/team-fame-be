import Product from "./products.model";

export class ProductService {
  async addProduct(newProduct) {
    const Data = await Product.addProduct(newProduct);
    return Data;
  }

  async getAllProductList() {
    const data = await Product.getProductList({});
    return data;
  }

  async getProductById(productId) {
    const data = await Product.getProductById(productId);
    return data;
  }

  async deleteProductById(productId) {
    const data = await Product.deleteProductById(productId);
    return data;
  }
}
