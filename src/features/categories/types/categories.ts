export interface ICategory {
  id: string;
  title: string;
  description: string;
  image: string;
  _count: {
    products: number;
  };
  subCategories: Array<{
    id: string;
    title: string;
  }>;
}
