export interface ProductFormProps {
  initialData?: {
    name: string;
    description: string;
    category: string;
    discount?: number;
    price: number;
    stock: number;
    images?: File[] | string[];
  };
  onSubmit: (data: {
    name: string;
    description: string;
    category: string;
    price: number;
    discount?: number;
    stock: number;
    images?: File[];
  }) => void;
  onClose: () => void;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  discount?: number;
  stock: number;
  image?: File[] | string[];
}

export interface PreviewImagesProps {
  images: (string | File)[];
  onRemove: (index: number) => void;
}

export type ProductImagesProps = {
  images: (string | File)[] | undefined;
};
