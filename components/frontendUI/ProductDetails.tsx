"use client";

import { RotateCcw, Truck } from "lucide-react";

import { Separator } from "@radix-ui/react-select";
import Image from "next/image";
import { useState } from "react";

import { DetailsType } from "@/utils/types";
import AddToCartSection from "../CartUi/AddToCartSection";
import { Badge } from "../ui/badge";
import formatCurrency from "@/utils/formatCurrency";
import { percentageCalculator } from "@/utils/percentageCalculator";

type ProductDetailsProp = {
  details: DetailsType | undefined;
  // loading: boolean;
};

function ProductDetails({ details }: ProductDetailsProp) {
  const [mainImage, setMainImage] = useState(
    details?.images?.at(0)?.public_url
  );

  // const percentage = (details?.price - details?.discount) / 100

  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
      {/* Product images */}
      <div className="space-y-4">
        <div className="relative aspect-square overflow-hidden rounded-lg border bg-white">
          {details && (
            <Image
              src={mainImage || "/placeholder.gpg"}
              alt={details?.name || "Product Details"}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover object-center"
              priority
            />
          )}
        </div>

        <div className="grid grid-cols-4 gap-2">
          {details?.images.map((image, index) => (
            <button
              key={index}
              className={`relative aspect-square rounded-md overflow-hidden border-2 ${
                mainImage === image.public_url
                  ? "border-pink-600"
                  : "border-transparent"
              }`}
              onClick={() => setMainImage(image.public_url)}
            >
              <Image
                src={image?.public_url}
                alt={`Product details ${index + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority
                className="object-cover object-center"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Product info */}
      <div className="flex flex-col  lg:w-[60%]">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          {details?.name}
        </h1>

        <div className="mb-6">
          {(details?.discount ?? 0) > 0 ? (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xl md:text-2xl font-bold text-pink-600">
                {formatCurrency(
                  (details?.price ?? 0) - (details?.discount ?? 0)
                )}
              </span>
              <span className="text-base md:text-lg text-gray-500 line-through">
                {formatCurrency(details?.price || 0)}
              </span>
              <Badge className="bg-green-600  text-sm md:text-base">
                Save{" "}
                {percentageCalculator(
                  details?.price ?? 0,
                  details?.discount ?? 0
                )}
              </Badge>
            </div>
          ) : (
            <span className="text-2xl font-bold text-pink-600">
              {formatCurrency(details?.price || 0)}
            </span>
          )}
        </div>

        <span className="line-clamp-2">{details?.description}</span>
        <Separator className="mb-4" />

        {/* Product specifications */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <span>
            <h3 className="text-sm font-medium text-gray-500">Category</h3>
            <p className="text-sm font-semibold text-gray-600">
              {details?.category}
            </p>
          </span>
          <span>
            <h3 className="text-sm font-medium text-gray-500">Availability</h3>
            <p
              className={`text-sm font-semibold ${
                (details?.stock ?? 0) > 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {(details?.stock ?? 0) > 0 ? "In Stock" : "Out of Stock"}
            </p>
          </span>
        </div>

        <Separator className="mb-4" />

        {/* Add to cart section */}
        <AddToCartSection />

        {/* Shipping info */}
        <div className="mt-8 space-y-3">
          <div className="flex items-start gap-3">
            <Truck className="w-5 h-5 text-pink-600 mt-0.5" />
            <div>
              <h3 className="text-sm font-medium">Free Shipping</h3>
              <p className="text-sm text-gray-500">
                On orders over {formatCurrency(50000)}. Delivery in 3-5 business
                days.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <RotateCcw className="w-5 h-5 text-pink-600 mt-0.5" />
            <div>
              <h3 className="text-sm font-medium">30-Day Returns</h3>
              <p className="text-sm text-gray-500">
                Not satisfied? Return within 10 days for a full refund.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductDetails;
