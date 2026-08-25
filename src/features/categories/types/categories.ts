export interface ICategory {
  id: string;
  title: string;
  description: string;
  image: string;
  subCategories: Array<{
    id: string;
    title: string;
  }>;
}
