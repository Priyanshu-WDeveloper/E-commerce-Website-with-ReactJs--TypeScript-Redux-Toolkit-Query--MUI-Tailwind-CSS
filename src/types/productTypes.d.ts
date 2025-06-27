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
  isLoading: boolean;
}

export interface ProductData {
  id: number;
  title: string;
  description: string;
  price: number;
  rating: number;
  images: string[];
  thumbnail: string;
  brand: string;
  category: string;
  availabilityStatus: string;
  discountPercentage: number;
  returnPolicy: string;
  warrantyInformation: string;
  shippingInformation: string;
  sku: string;
  stock: number;
  minimumOrderQuantity: number;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  tags: string[];
  meta: {
    createdAt: string;
    updatedAt: string;
    barcode: string;
    qrCode: string;
  };
  // reviews: any[];
  reviews: {
    reviewerName: string;
    reviewerEmail: string;
    rating: number;
    date: Date;
    comment: string;
  };
  weight?: number;
}
export type CategoryResponse = string[];
////////////////////////////////////////////
// type User={
//   id:number
//   name:string
//   email:string
//   isAdmin:boolean
// }
// interface User{
//   id:number
//   name:string
//   email:string
//   isAdmin:boolean
// }

// interface Cloth{
//   size:number
//   color:string
// }
// interface Product{
//    id:number
//   name:string
//   price:number
//   ClothingProduct:Cloth
// }
// ************************
// interface Product {
//   id: number;
//   name: string;
//   price: number;
// }
// interface ClothingProduct extends Product {
//   size: number;
//   color: string;
// }
