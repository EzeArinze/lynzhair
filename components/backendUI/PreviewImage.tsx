import { X } from "lucide-react";
import Image from "next/image";
import React from "react";

type PreviewImageProps = {
  previewUrl: string | File;
  handleRemoveImage: () => void;
};

function PreviewImage({ previewUrl, handleRemoveImage }: PreviewImageProps) {
  return (
    <div className="relative">
      <Image
        src={typeof previewUrl === "string" ? previewUrl : "/placeholder.svg"}
        alt="Preview"
        className="h-32 w-32 object-cover rounded-md"
        height={80}
        width={80}
      />
      <button
        type="button"
        onClick={handleRemoveImage}
        className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}

export default PreviewImage;
