export interface Occasion {
  id: string;
  title: string;
  description: string;
  image: string;
}

export interface PaginatedOccasions {
  data: Occasion[];
  metadata: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface OccasionOption {
  value: string;
  label: string;
  imageUrl: string;
}
export interface OccasionFilterProps {
  occasions: OccasionOption[];
}
