import React from "react";
import { Button } from "../ui/button";
import { ImageIcon } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import PreviewImage from "./PreviewImage";

type ImageUploaderType = {
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleRemoveImage: (index: number) => void;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  previewUrls: string[];
};

function ImageUploader({
  previewUrls,
  handleImageChange,
  fileInputRef,
  handleRemoveImage,
}: ImageUploaderType) {
  return (
    <div>
      <Label htmlFor="images" className="text-sm font-medium">
        Product Images
      </Label>
      <div className="mt-1">
        <Input
          id="images"
          type="file"
          onChange={handleImageChange}
          accept="image/*"
          className="hidden"
          multiple
          ref={fileInputRef}
        />
        {previewUrls.length > 0 ? (
          <>
            <PreviewImage images={previewUrls} onRemove={handleRemoveImage} />
            <Button
              type="button"
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              className="w-full mt-4"
            >
              <ImageIcon className="h-4 w-4 mr-2" />
              Add More Images
            </Button>
          </>
        ) : (
          <Button
            type="button"
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            className="w-full h-32 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-md hover:border-gray-400 transition-colors"
          >
            <ImageIcon className="h-8 w-8 mb-2 text-gray-400" />
            <span className="text-sm text-gray-500">Upload Images</span>
          </Button>
        )}
      </div>
    </div>
  );
}

export default ImageUploader;
