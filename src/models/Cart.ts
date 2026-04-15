import { Schema, model, models } from "mongoose";

const ColorSchema = new Schema(
  {
    name: { type: String, required: true },
    hex: { type: String, required: true },
  },
  { _id: false }
);

const CartItemSchema = new Schema(
  {
    productId: { type: String, required: true },
    title: { type: String, required: true },
    image: { type: String, required: true },
    selectedSize: { type: String, required: true },
    selectedColor: { type: ColorSchema, required: true },
    quantity: { type: Number, required: true, default: 1 },
    price: { type: Number, required: true },
  },
  { _id: false }
);

const CartSchema = new Schema(
  {
    userId: { type: String, required: true, unique: true },
    items: [CartItemSchema],
  },
  { timestamps: true }
);

const Cart = models.Cart || model("Cart", CartSchema);
export default Cart;
