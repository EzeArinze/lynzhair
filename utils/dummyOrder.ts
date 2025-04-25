// Type definitions for the dummy order object
interface IProductDetails {
  _id: string;
  name: string;
  price: number;
  image: string;
}

interface IProduct {
  product: IProductDetails;
  quantity: number;
}

interface IOrder {
  orderNumber: string;
  paystackCheckoutSessionId: string;
  UserId: string;
  customerName: string;
  email: string;
  paystackPaymentIntentId: string;
  products: IProduct[];
  totalPrice: number;
  currency: string;
  address: string;
  city: string;
  phone_number: string;
  status: "pending" | "paid" | "shipped" | "cancelled" | "delivered";
  orderDate: Date;
}

const product: IProductDetails = {
  _id: "prod_123456789",
  name: "Sample Product",
  price: 50,
  image: "https://example.com/product-image.jpg",
};

const dummyOrder: IOrder[] = [
  {
    orderNumber: "ORD123456789",
    paystackCheckoutSessionId: "sess_123456789",
    UserId: "user_123456789",
    customerName: "John Doe",
    email: "john.doe@example.com",
    paystackPaymentIntentId: "pi_123456789",
    products: [
      {
        product: product,
        quantity: 2,
      },
    ],
    totalPrice: product.price * 2,
    currency: "USD",
    address: "123 Main St",
    city: "Anytown",
    phone_number: "555-123-4567",
    status: "pending",
    orderDate: new Date(),
  },

  {
    orderNumber: "ORD123456777",
    paystackCheckoutSessionId: "sess_123456777",
    UserId: "user_123456777",
    customerName: "John Wick",
    email: "john.wick@example.com",
    paystackPaymentIntentId: "pi_123456777",
    products: [
      {
        product: product,
        quantity: 2,
      },
    ],
    totalPrice: product.price * 2,
    currency: "USD",
    address: "123 Main St",
    city: "Anytown",
    phone_number: "555-123-4567",
    status: "delivered",
    orderDate: new Date(new Date().setDate(new Date().getDate() - 1)),
  },
];

export default dummyOrder;
export type { IOrder, IProduct, IProductDetails };
