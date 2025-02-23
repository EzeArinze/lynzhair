export interface ProductTypes {
  _id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  discount?: number;
  stock: number;
  images?: File[] | string[]; // Ensure the property name matches if necessary
}

export interface ProductFormProps {
  initialData?: Omit<ProductTypes, "id">; // Remove 'id' since it's not needed in form
  onSubmit: (data: Omit<ProductTypes, "id">) => void; // Ensure consistency
  // onClose: () => void;
}

export interface PreviewImagesProps {
  images: (string | File)[];
  onRemove: (index: number) => void;
}

export type ProductImagesProps = {
  images: (string | File)[] | undefined;
};
