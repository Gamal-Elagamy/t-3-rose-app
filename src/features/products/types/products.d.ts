export interface IProduct {
  id: string;
  title: string;
  description: string;
  rating: number;
  ratings: number;
  stock: number;
  price: string;
  discountType: string;
  discountValue: string;
  cover: string;
  gallery: string[];
  categoryId: string;
  subCategoryId: string;
  immutable: boolean;
  deletedAt: null;
  createdAt: string;
  updatedAt: string;
  category: {
    id: string;
    title: string;
  };
  subCategory: {
    id: string;
    title: string;
  };
  occasions: [];
  _count: {
    reviews: number;
    cartItems: number;
    wishlistItems: number;
  };
}
