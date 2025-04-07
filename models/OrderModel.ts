import mongoose, { Schema, Document, Model } from "mongoose";

interface IProduct {
  product: mongoose.Schema.Types.ObjectId;
  quantity: number;
}

interface IOrder extends Document {
  orderNumber: string;
  paystackCheckoutSessionId: string;
  UserId: string;
  customerName: string;
  email: string;
  paystackPaymentIntentId: string;
  products: IProduct[];
  totalPrice: number;
  currency: string;
  address: string;
  city: string;
  phone_number: string;
  status: string;
  shippingMethod: string;
  freeShipping: boolean;
  orderDate: Date;
}

const ProductSchema: Schema = new Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: { type: Number, required: true },
});

const OrderSchema: Schema = new Schema(
  {
    orderNumber: { type: String, required: true },
    paystackCheckoutSessionId: { type: String, required: true },
    UserId: { type: String, required: true },
    customerName: { type: String, required: true },
    email: { type: String, required: true },
    paystackPaymentIntentId: { type: String, required: true },
    products: { type: [ProductSchema], required: true },
    totalPrice: { type: Number, required: true, min: 0 },
    currency: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    phone_number: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "paid", "shipped", "delivered", "cancelled"],
      required: true,
    },
    freeShipping: { type: Boolean, required: true },
    shippingMethod: { type: String, required: true },
    orderDate: { type: Date, required: true },
  },
  {
    timestamps: true,
  }
);

const Order: Model<IOrder> =
  mongoose.models.Order || mongoose.model<IOrder>("Order", OrderSchema);

export { Order };
export type { IOrder };
