import IProductReviews from './product-reviews';

export interface Category {
  id: string;
  title: string;
  description: string;
  image: string;
  immutable: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SubCategory {
  id: string;
  categoryId: string;
  title: string;
  description: string;
  image: string | null;
  immutable: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ProductCount {
  cartItems: number;
  reviews: number;
  wishlistItems: number;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  cover: string;
  gallery: string;
  price: string;
  discountType: 'PERCENT' | 'FIXED';
  discountValue: string;
  stock: number;
  rating: number;
  ratings: number;
  immutable: boolean;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
  categoryId: string;
  subCategoryId: string;
  category: Category;
  subCategory: SubCategory;
  occasions: unknown[];
  reviews: IProductReviews[];
  _count: ProductCount;
}

export interface ProductResponse {
  product: Product;
}
