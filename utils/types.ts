export interface ProductTypes {
  _id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  discount?: number;
  stock: number;
  images?: File[] | string[];
}

export interface ProductFormProps {
  initialData?: Omit<ProductTypes, "id">;
  onSubmit: (data: Omit<ProductTypes, "id">) => void;
  // onClose: () => void;
}

export type ProductImage = {
  public_url: string;
  public_id: string;
};

export interface PreviewImagesProps {
  images: (string | File | ProductImage)[];
  onRemove: (index: number) => void;
}

export type ProductImagesProps = {
  images: (string | File | ProductImage)[] | undefined;
};
