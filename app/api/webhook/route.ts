import { NextResponse } from "next/server";
import crypto from "crypto";
import { SECRET } from "@/lib/constant/env";

export async function POST(req: Request) {
  try {
    const body = await req.text();

    const hash = crypto.createHmac("sha512", SECRET).update(body).digest("hex");

    if (hash !== req.headers.get("x-paystack-signature")) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    const event = JSON.parse(body);

    if (event.event === "charge.success") {
      const { reference, metadata, customer } = event.data;

      //Build order dtat
      const orderData = {
        reference,
        metadata,
        customer,
      };

      // Save the order in Backend

      return NextResponse.json(
        {
          orderData,
          message: "Webhook successul and other created successfully",
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
