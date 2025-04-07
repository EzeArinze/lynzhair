import { NextResponse } from "next/server";
import crypto from "crypto";
import { PAYSTACK_SECRET } from "@/lib/constant/env";
import { Order } from "@/models/OrderModel";

export async function POST(req: Request) {
  try {
    const body = await req.text();

    const hash = crypto
      .createHmac("sha512", PAYSTACK_SECRET)
      .update(body)
      .digest("hex");

    if (hash !== req.headers.get("x-paystack-signature")) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    const event = JSON.parse(body);

    if (
      event.event === "charge.success" ||
      event.event === "transfer.success"
    ) {
      const {
        id,
        reference,
        metadata,
        customer,
        // status,
        paid_at,
        currency,
        // ip_address,
      } = event.data;

      if (
        !metadata ||
        !customer ||
        !metadata.product ||
        !metadata.totalAmount
      ) {
        throw new Error("Invalid webhook payload: Missing required fields");
      }

      const { email, id: UserId } = customer;
      const {
        totalAmount,
        phone,
        fullName,
        address,
        city,
        state,
        shippingMethod,
        method,
        product,
      } = metadata;

      // Build order data
      const order = {
        orderNumber: id,
        paystackCheckoutSessionId: reference,
        UserId: UserId,
        customerName: fullName,
        email,
        paystackPaymentIntentId: reference,
        products: product.map(
          (item: { productId: string; quantity: number }) => ({
            product: item.productId,
            quantity: item.quantity,
          })
        ),
        totalPrice: Number(totalAmount),
        currency,
        address,
        city,
        state,
        phone_number: phone,
        status: "paid",
        freeShipping: method,
        shippingMethod,
        orderDate: new Date(paid_at).toISOString(),
      };

      // Save order to database
      try {
        await new Order(order).save();
        console.log("Successfully Created");
      } catch (dbError) {
        console.error("Error saving order to database:", dbError);
        throw new Error("Failed to save order");
      }

      return NextResponse.json(
        {
          message: "Order proccessed successfully",
        },
        { status: 200 }
      );
    }

    return NextResponse.json({ status: "success", message: "Event ignored" });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Faild to implement paystack Webhook" },
      { status: 500 }
    );
  }
}
