import { NextResponse } from "next/server";
import axios from "axios";
import {
  BASE_URL,
  PAYSTACK_INITIALIZE_URI,
  PAYSTACK_SECRET,
} from "@/lib/constant/env";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, phone, amount, metadata } = body;

    if (!phone || !amount || !email) {
      return NextResponse.json(
        { error: "Email ,amount and phone are required" },
        { status: 400 }
      );
    }

    const response = await axios.post(
      `${PAYSTACK_INITIALIZE_URI}`,
      {
        email,
        phone: phone,
        amount: Math.round(Number.parseFloat(amount) * 100), // Convert to kobo
        metadata,
        callback_url: `${BASE_URL}/commerce/success`,
      },
      {
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET}`,
          "Content-Type": "application/json",
        },
      }
    );

    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Error initializing Paystack payment:", error);

    return NextResponse.json(
      { error: "Something went wrong when initializing payment" },
      { status: 500 }
    );
  }
}
