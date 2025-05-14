export interface ProductsResponse {
  // it  is response before .data or.products
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export interface Product {
  id: number;
  title: string;
  image: string;
  price: number;
  quantity: number;
  productId?: number;
  brand: string;
  thumbnail: string;
  returnPolicy: string;
  discountPercentage: number;
  rating?: number;
  originalPrice?: number;
}

export interface CartItemProps {
  data: Product;
}

export interface ProductData {
  id: number;
  title: string;
  description: string;
  price: number;
  rating: number;
  images: string[];
}
export type CategoryResponse = string[];
