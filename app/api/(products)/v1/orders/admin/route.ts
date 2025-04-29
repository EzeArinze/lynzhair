import { Order } from "@/models/OrderModel";
import connectDB from "@/lib/dbconnect";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function GET(request: Request) {
  try {
    await connectDB();

    // Check if Product model exists, if not, just import it
    if (!mongoose.models.Product) {
      await import("@/models/ProductModel");
    }

    // Parse query parameters
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "0", 10); // Default to 0 (no limit)
    const recent = searchParams.get("recent") === "true";

    let query = Order.find(
      {},
      "orderNumber customerName status createdAt orderDate totalPrice"
    ).sort({ orderDate: -1 });

    if (recent) {
      query = query.limit(limit || 6); // Limit to 6 most recent orders by default
    }

    // const orders = await query.lean();

    // if (!orders) {
    //   return NextResponse.json({ message: "No orders found" }, { status: 404 });
    // }

    // const totalCustomers = (await Order.distinct("customerName")).length;

    // const totalOrders = await Order.countDocuments({});

    // const totalAmountResult = await Order.aggregate([
    //   { $group: { _id: null, totalAmount: { $sum: "$totalPrice" } } },
    // ]);

    // const totalRevenue = totalAmountResult[0]?.totalAmount || 0;

    const [orders, totalCustomers, totalOrders, totalAmountResult] =
      await Promise.all([
        query.lean(),
        Order.distinct("customerName").then((customers) => customers.length),
        Order.countDocuments({}),
        Order.aggregate([
          { $group: { _id: null, totalAmount: { $sum: "$totalPrice" } } },
        ]),
      ]);

    if (!orders) {
      return NextResponse.json({ message: "No orders found" }, { status: 404 });
    }
    const totalRevenue = totalAmountResult[0]?.totalAmount || 0;

    const response = {
      totalCustomers,
      totalOrders,
      totalRevenue,
      orders,
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { message: "Error fetching orders", error: (error as Error).message },
      { status: 500 }
    );
  }
}
