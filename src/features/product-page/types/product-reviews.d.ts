import { IUser } from '@/shared/lib/types/user';

export default interface IProductReviews {
  id: string;
  content: string;
  headline: string;
  rating: number;
  createdAt: string;
  updatedAt: string;
  productId: string;
  userId: string;
  product: {
    id: string;
    title: string;
  };
  user: IUser;
}

export interface IMetadata {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}
