export enum orderStatus {
  ORDERPLACED = "order placed",
  SHIPPED = "shipped",
  OUTFORDELIVERY = "out for delivery",
  DELIVERED = "delivered",
  DELAYED = "delayed",
  FAILED = "failed",
}

export enum orderDescription {
  ORDERPLACED = "order is placed successfully",
  SHIPPED = "your order has left the warehouse and is on its way to the delivery carrier.",
  OUTFORDELIVERY = "the package is with the delivery person and will reach you today.",
  DELIVERED = "order successfully delivered to the given address.",
  DELAYED = "unexpected issues caused a delay in shipment or delivery.",
  FAILED = "order was not placed",
}
