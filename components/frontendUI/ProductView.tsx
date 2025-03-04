import axios from "axios";
import { ProductCard } from "./ProductCard";

const BASE_URL = process.env.BASE_URL;

export type productType = {
  _id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  description: string;
  discount: number;
  images: { public_url: string; public_id: string }[];
};

const Products = async () => {
  const productData = await axios.get(`${BASE_URL}/api/getProducts`);
  return productData.data as productType[];
};

async function ProductView() {
  const products = await Products();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
}

export default ProductView;
