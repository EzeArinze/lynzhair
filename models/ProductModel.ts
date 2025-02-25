import mongoose, { Schema, Document, Model } from "mongoose";

interface IProduct extends Document {
  name: string;
  category: string;
  price: number;
  stock: number;
  description: string;
  discount: number;
  images: { public_url: string; public_id: string }[];
}

const ProductSchema: Schema = new Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  description: { type: String, required: true },
  discount: { type: Number, required: true },
  images: [
    {
      public_url: { type: String, required: true },
      public_id: { type: String, required: true },
    },
  ],
});

const Product: Model<IProduct> =
  mongoose.models?.Product ||
  mongoose.model<IProduct>("Product", ProductSchema);

export { Product };
