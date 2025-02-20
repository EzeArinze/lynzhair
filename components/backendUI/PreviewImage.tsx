// import { X } from "lucide-react";
// import Image from "next/image";
// import React from "react";

// type PreviewImageProps = {
//   previewUrl: string | File;
//   handleRemoveImage: () => void;
// };

// function PreviewImage({ previewUrl, handleRemoveImage }: PreviewImageProps) {
//   return (
//     <div className="relative">
//       <Image
//         src={typeof previewUrl === "string" ? previewUrl : "/placeholder.svg"}
//         alt="Preview"
//         className="h-32 w-32 object-cover rounded-md"
//         height={80}
//         width={80}
//       />
//       <button
//         type="button"
//         onClick={handleRemoveImage}
//         className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full"
//       >
//         <X className="h-4 w-4" />
//       </button>
//     </div>
//   );
// }

// export default PreviewImage;

import { PreviewImagesProps } from "@/utils/types";
import { X } from "lucide-react";
import Image from "next/image";

export default function PreviewImages({
  images,
  onRemove,
}: PreviewImagesProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 my-3">
      {images.map((image, index) => (
        <div key={index} className="relative group">
          <div className="aspect-square relative rounded-lg overflow-hidden border bg-gray-50">
            <Image
              src={
                typeof image === "string" ? image : URL.createObjectURL(image)
              }
              alt={`Preview ${index + 1}`}
              fill
              className="object-cover transition-transform group-hover:scale-105"
            />
          </div>
          <button
            type="button"
            onClick={() => onRemove(index)}
            className="absolute -top-1.5 -right-1.5 bg-red-500 text-white p-1 rounded-full shadow-md hover:bg-red-600 transition-colors opacity-90 hover:opacity-100"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
}
