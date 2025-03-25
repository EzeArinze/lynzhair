import { NextResponse } from "next/server";
import crypto from "crypto";
import { PAYSTACK_SECRET } from "@/lib/constant/env";

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
        reference,
        metadata,
        customer,
        status,
        paid_at,
        currency,
        ip_address,
      } = event.data;

      const orderData = {
        reference,
        metadata,
        customer,
        status,
        paid_at,
        currency,
        ip_address,
      };

      // const { email , id} = customer;
      // const { totalAmount, phone, fullName,address, city, state,shippingMethod, method} = metadata;
      console.log("Order Data:", orderData);

      // Save order to database
      // const order = new Order(orderData);
      // await order.save();

      return NextResponse.json(
        {
          orderData,
          message: "Webhook successful and order created successfully",
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
