export interface IWishlistProduct {
  id: string;
  title: string;
  description: string;
  rating: number;
  ratings: number;
  stock: number;
  price: string;
  discountType: string | null;
  discountValue: string | null;
  cover: string;
  category: {
    id: string;
    title: string;
  };
  subCategory: {
    id: string;
    title: string;
  };
}

export interface IWishlistItem {
  id: string;
  userId: string;
  productId: string;
  createdAt: string;
  product: IWishlistProduct;
}