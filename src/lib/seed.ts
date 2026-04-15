import { IProduct } from "@/types";

// Seeded product data matching the Figma UI
export const seedProducts: Omit<IProduct, "_id">[] = [
  {
    title: "Premium Tagerine Shirt",
    description:
      "A vibrant tropical print shirt crafted from lightweight breathable fabric. Perfect for summer outings.",
    price: 257.85,
    category: "Men",
    images: [
      "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=600&q=80",
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Yellow", hex: "#C8A951" },
      { name: "Blue", hex: "#5B7FA6" },
      { name: "Silver", hex: "#A8B4C0" },
    ],
  },
  {
    title: "Leather Tagerine Coat",
    description:
      "A sophisticated leather coat with a tailored fit. Elevate your style with this timeless piece.",
    price: 325.36,
    category: "Women",
    images: [
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80",
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Tan", hex: "#C49A6C" },
      { name: "Black", hex: "#1C1C1C" },
      { name: "Brown", hex: "#7B4F2E" },
    ],
  },
  {
    title: "Tagerine Casual Shirt",
    description:
      "A relaxed fit casual shirt ideal for everyday wear. Soft fabric with a modern cut.",
    price: 240.32,
    category: "Men",
    images: [
      "https://images.unsplash.com/photo-1514866726862-0f081731e63f?w=600&q=80",
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Rose", hex: "#C9736F" },
      { name: "White", hex: "#F5F0EB" },
      { name: "Olive", hex: "#7A8C5C" },
    ],
  },
  {
    title: "Tagerine Blazer",
    description:
      "A smart structured blazer perfect for both formal and semi-formal occasions.",
    price: 126.47,
    category: "Women",
    images: [
      "https://images.unsplash.com/photo-1548454782-15b189d129ab?w=600&q=80",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Blush", hex: "#D4A5A5" },
      { name: "Camel", hex: "#C19A6B" },
      { name: "Navy", hex: "#2C3E6B" },
    ],
  },
];
