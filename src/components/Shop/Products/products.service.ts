import { OrderDetailsService } from "../../OrderDetails/orderDetails.service";
import Product from "./products.model";

export class ProductService {
  async addProduct(newProduct) {
    if (newProduct.cashback) {
      if (!newProduct["offers"]) {
        newProduct["offers"] = {};
      }
      newProduct["offers"]["cashback"] = newProduct.cashback;
    }
    newProduct["quantity"] = 1;

    const Data = await Product.addProduct(newProduct);
    return Data;
  }

  async getAllProductList() {
    // Get products and orders
    const data = await Product.getProductList({});
    const orders: any = await new OrderDetailsService().getOrderDetailList({});

    // Initialize counters
    let totalQuantity = 0;
    let totalOrderedQuantity = 0; // Initialize to 0 instead of undefined

    // Calculate total product quantity
    for (let i = 0; i < data.length; i++) {
      if (data[i]?.quantity) {
        totalQuantity += data[i].quantity;
      }
    }

    // Calculate total ordered quantity
    if (orders?.orderDetails && Array.isArray(orders.orderDetails)) {
      // If orderDetails is directly on orders object
      for (const orderDetail of orders.orderDetails) {
        if (orderDetail?.quantity) {
          totalOrderedQuantity += orderDetail.quantity;
        }
      }
    } else if (Array.isArray(orders)) {
      // If orders is an array of order objects
      for (const order of orders) {
        if (order?.orderDetails && Array.isArray(order.orderDetails)) {
          for (const orderDetail of order.orderDetails) {
            if (orderDetail?.quantity) {
              totalOrderedQuantity += orderDetail.quantity;
            }
          }
        }
      }
    }

    // Calculate remaining quantity
    const remainingQuantity = totalQuantity - totalOrderedQuantity;

    // console.log({
    //   totalProductQuantity: totalQuantity,
    //   totalOrderedQuantity: totalOrderedQuantity,
    //   remainingQuantity: remainingQuantity,
    // });

    // Return products with inventory information
    return {
      products: data,
      inventorySummary: {
        totalProductQuantity: totalQuantity,
        totalOrderedQuantity: totalOrderedQuantity,
        remainingQuantity: remainingQuantity,
      },
    };
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
  async updateProductById(productId, modifiedData) {
    const data = await Product.updateProductById(productId, modifiedData);
    return data;
  }
}
