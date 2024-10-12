import Product from "./products.model";

export class ProductService {
  async addProduct(newProduct) {
    if (newProduct.cashback) {
      if (!newProduct["offers"]) {
        newProduct["offers"] = {};
      }
      newProduct["offers"]["cashback"] = newProduct.cashback;
    }
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
  async deleteProduct(docId) {
    const data = await Product.deleteProductById(docId);
    return data;
  }
}
