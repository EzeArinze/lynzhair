// import mongoose from "mongoose";

// export const ProductSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     description: { type: String, required: true },
//     category: { type: String, required: true },
//     price: { type: Number, required: true },
//     discount: { type: Number, default: 0 },
//     stock: { type: Number, required: true },
//     images: { type: [String], required: true },
//   },
//   { timestamps: true }
// );

// export const Product =
//   mongoose.models?.Product || mongoose.model("Product", ProductSchema);

import mongoose, { Schema, Document, Model } from "mongoose";

interface IProduct extends Document {
  name: string;
  category: string;
  price: number;
  stock: number;
  description: string;
  discount: number;
  images: string[];
}

const ProductSchema: Schema = new Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, default: 0 },
  description: { type: String, required: true },
  discount: { type: Number, default: 0 },
  images: { type: [String] },
});

const Product: Model<IProduct> =
  mongoose.models?.Product ||
  mongoose.model<IProduct>("Product", ProductSchema);

export { Product };
