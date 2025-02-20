import React from "react";
import Image from "next/image";

type ProductImagesProps = {
  images: (string | File)[] | undefined;
};

function ProductImages({ images }: ProductImagesProps) {
  return (
    <div className="flex -space-x-2 overflow-hidden">
      {images?.slice(0, 2).map((image, index) => {
        const imageUrl =
          typeof image === "string" ? image : URL.createObjectURL(image);
        return (
          <div
            key={index}
            className="inline-block h-10 w-10 rounded-full border-2 border-white"
          >
            <Image
              src={imageUrl}
              alt={`Product image ${index + 1}`}
              width={40}
              height={40}
              className="h-full w-full rounded-full object-cover"
            />
          </div>
        );
      })}
      {(images?.length || 0) > 2 && (
        <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-gray-100">
          <span className="text-sm text-gray-600">+{images!.length - 2}</span>
        </div>
      )}
    </div>
  );
}

export default ProductImages;
