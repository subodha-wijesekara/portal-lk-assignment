import { Schema, model, models } from "mongoose";

const ColorSchema = new Schema(
  {
    name: { type: String, required: true },
    hex: { type: String, required: true },
  },
  { _id: false }
);

const OrderItemSchema = new Schema(
  {
    productId: { type: String, required: true },
    title: { type: String, required: true },
    image: { type: String, required: true },
    selectedSize: { type: String, required: true },
    selectedColor: { type: ColorSchema, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
  },
  { _id: false }
);

const OrderSchema = new Schema(
  {
    orderId: { type: String, required: true, unique: true },
    userId: { type: String, required: true },
    items: [OrderItemSchema],
    totalItems: { type: Number, required: true },
    deliveryFee: { type: Number, required: true, default: 12 },
    totalPayment: { type: Number, required: true },
    deliveryAddress: { type: String, default: "25/3 Housing Estate, Sylhet" },
    paymentMethod: { type: String, default: "VISA" },
    status: {
      type: String,
      enum: ["pending", "confirmed", "shipped", "delivered"],
      default: "confirmed",
    },
  },
  { timestamps: true }
);

const Order = models.Order || model("Order", OrderSchema);
export default Order;
