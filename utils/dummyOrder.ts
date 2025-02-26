// const product = {
//   _id: "prod_123456789",
//   name: "Sample Product",
//   price: 50,
//   image: "https://example.com/product-image.jpg",
// };

// const dummyOrder = {
//   orderNumber: "ORD123456789",
//   paystackCheckoutSessionId: "sess_123456789",
//   UserId: "user_123456789",
//   customerName: "John Doe",
//   email: "john.doe@example.com",
//   paystackPaymentIntentId: "pi_123456789",
//   products: [
//     {
//       product: {
//         _id: product._id,
//         name: product.name,
//         price: product.price,
//         image: product.image,
//       },
//       quantity: 2,
//     },
//   ],
//   totalPrice: product.price * 2,
//   currency: "USD",
//   address: "123 Main St",
//   city: "Anytown",
//   status: "pending",
//   orderDate: new Date(),
// };

// export default dummyOrder;

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
  status: "pending" | "paid" | "shipped" | "delivered" | "cancelled";
  orderDate: Date;
}

const product: IProductDetails = {
  _id: "prod_123456789",
  name: "Sample Product",
  price: 50,
  image: "https://example.com/product-image.jpg",
};

const dummyOrder: IOrder = {
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
  status: "pending",
  orderDate: new Date(),
};

export default dummyOrder;
export type { IOrder, IProduct, IProductDetails };
