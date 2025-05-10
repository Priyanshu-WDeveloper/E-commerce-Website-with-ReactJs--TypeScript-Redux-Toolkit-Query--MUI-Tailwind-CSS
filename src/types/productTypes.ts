export interface Product {
  id: number;
  title?: string;
  image?: string;
  price?: number;
  quantity: number;
  productId?: number;
}

export interface CartItemProps {
  data: Product;
}
