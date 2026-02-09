export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: string;
  category_id: string;
  name: string;
  slug: string;
  brand: string;
  description: string | null;
  price: number;
  discounted_price: number | null;
  image_url: string | null;
  stock: number;
  is_featured: boolean;
  is_active: boolean;
  has_flavors: boolean;
  created_at: string;
  updated_at: string;
  category?: Category;
}

export interface ProductFlavor {
  id: string;
  product_id: string;
  name: string;
  stock: number;
  is_active: boolean;
  created_at: string;
}

export interface OrderItem {
  product_id: string;
  product_name: string;
  flavor?: string;
  quantity: number;
  unit_price: number;
  total: number;
}

export interface Order {
  id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string | null;
  shipping_address: string;
  items: OrderItem[];
  subtotal: number;
  total: number;
  status: string;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface CartItem {
  product: Product;
  flavor?: ProductFlavor;
  quantity: number;
}
