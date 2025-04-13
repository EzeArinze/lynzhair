import { LucideIcon } from "lucide-react";
import { ComponentType, ReactNode } from "react";

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
  onClose?: () => void;
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

// Details Types
interface Image {
  public_url: string;
  public_id: string;
  _id: string;
}

export interface DetailsType {
  _id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  description: string;
  discount: number;
  images: Image[];
  __v: number;
}

export interface ShippingFormData {
  fullName: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  shippingMethod: string;
  agreeToTerms: boolean;
}

type Column = {
  header: string;
  key: string;
  hideOnMobile?: boolean;
};

// Props for the table component
export type SimpleTableProps = {
  data: Record<string, unknown>[]; // Array of data objects with key-value pairs
  columns: Column[];
  title?: string;
  idField?: string; // Name of the ID field in data objects
  statusField?: string; // Name of the status field in data objects
  statusOptions?: { value: string; label: string; color?: string }[]; // Status options
  onStatusChange?: (id: string, newStatus: string) => void; // Status change handler
  onDelete?: (id: string) => void;
  ActionsComponent?: ComponentType<{
    Id: string;
    onDelete?: (id: string) => void;
  }>; // Component for actions column
  pageSize?: number; // Number of items per page
  initialPage?: number; // Initial page number
};

export interface ContactCard {
  id: string;
  title: string;
  description: string;
  contact: string;
  link: string;
  icon: LucideIcon;
  bgColor: string;
  textColor: string;
  hoverBorderColor: string;
}

export interface ModalType {
  isOpen: boolean;
  onClose?: () => void;
  title: string;
  children: ReactNode;
}

export interface ShippingFormProps {
  formData: ShippingFormData;
  setFormData: React.Dispatch<React.SetStateAction<ShippingFormData>>;
  onSubmit: (e: React.FormEvent) => void;
  qualifiesForFreeShipping: boolean;
  freeShippingThreshold: number;
}

// Props for the OrderItem component
interface Product {
  _id: string;
  name: string;
  images: Image[];
}

interface OrderItem {
  product: Product;
  quantity: number;
}

export interface Order {
  _id: string;
  orderNumber: string;
  email: string;
  orderDate: string; // ISO date string
  products: OrderItem[];
  totalPrice: number;
  status?: string; // Optional, defaults to "processing" if not provided
}

// Types for OrderDetails
export interface OrderDetail {
  _id: string;
  UserId: string;
  address: string;
  city: string;
  state: string;
  customerName: string;
  email: string;
  phone_number: string;
  orderDate: string; // ISO date string
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  orderNumber: string;
  shippingMethod: string;
  freeShipping: boolean;
  status: string;
  totalPrice: number;
  currency: string;
  paystackCheckoutSessionId: string;
  paystackPaymentIntentId: string;
  products: OrderItem[];
}
