export interface IProduct {
  _id: string;
  title: string;
  description: string;
  price: number;
  category: "Men" | "Women" | "Kids" | "Other";
  images: string[];
  sizes: string[];
  colors: IColor[];
}

export interface IColor {
  name: string;
  hex: string;
}

export interface ICartItem {
  productId: string;
  title: string;
  image: string;
  selectedSize: string;
  selectedColor: IColor;
  quantity: number;
  price: number;
}

export interface ICart {
  _id: string;
  userId: string;
  items: ICartItem[];
}

export interface IOrder {
  _id: string;
  orderId: string;
  userId: string;
  items: ICartItem[];
  totalItems: number;
  deliveryFee: number;
  totalPayment: number;
  deliveryAddress: string;
  paymentMethod: string;
  status: "pending" | "confirmed" | "shipped" | "delivered";
  createdAt: string;
}
