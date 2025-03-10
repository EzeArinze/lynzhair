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
  isProcessing?: boolean;
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

export interface FilterSidebarProps {
  minPrice: number;
  maxPrice: number;
  setMinPrice: (value: number) => void;
  setMaxPrice: (value: number) => void;
  onClearFilters: () => void;
  className?: string;
}

export interface MobileFiltersProps {
  minPrice: number;
  maxPrice: number;
  setMinPrice: (value: number) => void;
  setMaxPrice: (value: number) => void;
  onClearFilters: () => void;
  activeFiltersCount?: number;
}
