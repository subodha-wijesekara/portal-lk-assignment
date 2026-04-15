import mongoose, { Schema, model, models } from "mongoose";

const ColorSchema = new Schema(
  {
    name: { type: String, required: true },
    hex: { type: String, required: true },
  },
  { _id: false }
);

const ProductSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: "" },
    price: { type: Number, required: true },
    category: {
      type: String,
      enum: ["Men", "Women", "Kids", "Other"],
      required: true,
    },
    images: [{ type: String }],
    sizes: [{ type: String }],
    colors: [ColorSchema],
  },
  { timestamps: true }
);

const Product = models.Product || model("Product", ProductSchema);
export default Product;
