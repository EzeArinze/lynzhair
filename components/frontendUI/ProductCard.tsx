import Image from "next/image";

import formatCurrency from "@/utils/formatCurrency";
import { productType } from "@/utils/types";
import Link from "next/link";
import AddToCartButton from "../CartUi/AddToCartButton";
import AddToFavorite from "../FavoriteUi/AddToFavorite";

type ProductCardProps = {
  product: productType;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group relative bg-white rounded-lg border overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-64 overflow-hidden">
        <Image
          src={product.images.at(0)?.public_url || "/placeholder.svg"}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
          className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
        />
        <div></div>
        <AddToFavorite product={product} />
      </div>
      <div className="p-4 space-y-4">
        <Link href={`/commerce/product-detail/${product._id}`}>
          <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
          <p className="text-sm text-gray-500 mb-2">{product.category}</p>
          <div className="flex items-center justify-between">
            <span className="font-bold text-lg">
              {formatCurrency(product.price)}
            </span>
          </div>
        </Link>
        <AddToCartButton product={product} />
      </div>
    </div>
  );
}
