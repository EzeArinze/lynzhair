import { BASE_URL } from "@/lib/constant/env";
import axios from "axios";

interface OrderData {
  phone: string;
  totalAmount: number;
  [key: string]: unknown;
}

export const initializePayment = async (
  orderData: OrderData,
  email: string
) => {
  // Removed useAuthentication hook usage

  try {
    const response = await axios.post(`${BASE_URL}/api/initialize`, {
      email,
      phone: orderData?.phone,
      amount: orderData?.totalAmount,
      metadata: {
        orderDetails: orderData,
      },
    });

    if (!response.data) {
      throw new Error("Failed to initialize payment");
    }

    const data = response.data;

    // Redirect user to Paystack payment page
    if (data.data && data.data.authorization_url) {
      window.location.href = data.data.authorization_url;
    } else {
      throw new Error("Authorization URL not received");
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("initializing payment:", error.message);
    }
  }
};
