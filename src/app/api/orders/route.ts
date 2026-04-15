import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Cart from "@/models/Cart";
import Order from "@/models/Order";
import { ICartItem } from "@/types";

const MOCK_USER_ID = process.env.MOCK_USER_ID || "test-user-001";
const DELIVERY_FEE = 12;

function generateOrderId(): string {
  return `#${Math.floor(100000 + Math.random() * 900000)}`;
}

/** POST /api/orders — create an order from current cart, simulate payment success */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { deliveryAddress, paymentMethod } = body;

    await connectDB();

    const cart = await Cart.findOne({ userId: MOCK_USER_ID });
    if (!cart || cart.items.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    const totalItems = cart.items.reduce(
      (sum: number, item: ICartItem) => sum + item.price * item.quantity,
      0
    );
    const totalPayment = totalItems + DELIVERY_FEE;

    const orderId = generateOrderId();

    const order = new Order({
      orderId,
      userId: MOCK_USER_ID,
      items: cart.items,
      totalItems: parseFloat(totalItems.toFixed(2)),
      deliveryFee: DELIVERY_FEE,
      totalPayment: parseFloat(totalPayment.toFixed(2)),
      deliveryAddress: deliveryAddress || "25/3 Housing Estate, Sylhet",
      paymentMethod: paymentMethod || "VISA",
      status: "confirmed", // simulate payment success
    });

    await order.save();

    // Clear the cart after order is placed
    cart.items = [];
    await cart.save();

    return NextResponse.json({
      message: "Order created successfully",
      orderId,
      totalPayment: order.totalPayment,
      status: order.status,
    });
  } catch (error) {
    console.error("[POST /api/orders]", error);
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}

/** GET /api/orders — list all orders for the mock user */
export async function GET() {
  try {
    await connectDB();
    const orders = await Order.find({ userId: MOCK_USER_ID }).sort({ createdAt: -1 }).lean();

    const serialized = orders.map((o) => ({
      ...o,
      _id: o._id.toString(),
    }));

    return NextResponse.json({ orders: serialized });
  } catch (error) {
    console.error("[GET /api/orders]", error);
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}
