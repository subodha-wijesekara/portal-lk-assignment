import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Cart from "@/models/Cart";
import { ICartItem } from "@/types";

const MOCK_USER_ID = process.env.MOCK_USER_ID || "test-user-001";

/** GET /api/cart — retrieve cart for the mock user */
export async function GET() {
  try {
    await connectDB();
    const cart = await Cart.findOne({ userId: MOCK_USER_ID }).lean();

    if (!cart) {
      return NextResponse.json({ cart: { userId: MOCK_USER_ID, items: [] } });
    }

    return NextResponse.json({
      cart: { ...cart, _id: (cart._id as { toString(): string }).toString() },
    });
  } catch (error) {
    console.error("[GET /api/cart]", error);
    return NextResponse.json({ error: "Failed to fetch cart" }, { status: 500 });
  }
}

/** POST /api/cart — add an item or increment quantity */
export async function POST(request: NextRequest) {
  try {
    const body: ICartItem = await request.json();
    const { productId, selectedSize, selectedColor, quantity, price, title, image } = body;

    if (!productId || !selectedSize || !selectedColor) {
      return NextResponse.json(
        { error: "productId, selectedSize, and selectedColor are required" },
        { status: 400 }
      );
    }

    await connectDB();

    let cart = await Cart.findOne({ userId: MOCK_USER_ID });

    if (!cart) {
      cart = new Cart({ userId: MOCK_USER_ID, items: [] });
    }

    // Check if same product+size+color already in cart → increment qty
    const existingIndex = cart.items.findIndex(
      (item: ICartItem) =>
        item.productId === productId &&
        item.selectedSize === selectedSize &&
        item.selectedColor.name === selectedColor.name
    );

    if (existingIndex >= 0) {
      cart.items[existingIndex].quantity += quantity || 1;
    } else {
      cart.items.push({ productId, title, image, selectedSize, selectedColor, quantity: quantity || 1, price });
    }

    await cart.save();

    return NextResponse.json({
      message: "Item added to cart",
      cart: { ...cart.toObject(), _id: cart._id.toString() },
    });
  } catch (error) {
    console.error("[POST /api/cart]", error);
    return NextResponse.json({ error: "Failed to update cart" }, { status: 500 });
  }
}

/** DELETE /api/cart — remove specific item or clear cart */
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const productId = searchParams.get("productId");
    const selectedSize = searchParams.get("selectedSize");
    const colorName = searchParams.get("colorName");

    await connectDB();
    const cart = await Cart.findOne({ userId: MOCK_USER_ID });
    if (!cart) return NextResponse.json({ message: "Cart empty" });

    if (productId && selectedSize && colorName) {
      cart.items = cart.items.filter(
        (item: ICartItem) =>
          !(
            item.productId === productId &&
            item.selectedSize === selectedSize &&
            item.selectedColor.name === colorName
          )
      );
    } else {
      cart.items = [];
    }

    await cart.save();
    return NextResponse.json({ message: "Cart updated", cart: cart.toObject() });
  } catch (error) {
    console.error("[DELETE /api/cart]", error);
    return NextResponse.json({ error: "Failed to update cart" }, { status: 500 });
  }
}
