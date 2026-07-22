export interface Category {
  id: string;
  title: string;
  description: string;
  image: string;
}

export interface PaginatedCategories {
  data: Category[];
  metadata: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface CategoryOption {
  value: string;
  label: string;
}
export interface CategoryFilterProps {
  categories: CategoryOption[];
}
