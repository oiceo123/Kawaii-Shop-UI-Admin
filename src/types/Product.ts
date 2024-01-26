export type Image = {
  filename: string;
  url: string;
};

export type Product = {
  id: string;
  title: string;
  price: number;
  description: string;
  category: {
    id: number;
    title: string;
  };
  images: (Image & { id: string })[];
  created_at: string;
  updated_at: string;
};

export type ProductFilter = {
  search?: string;
  page?: number;
  limit?: number;
  order_by?: string;
  sort?: string;
};

export type ProductRes = {
  data: Product[];
  page: number;
  limit: number;
  total_page: number;
  total_item: number;
};

export type ProductAddForm = {
  title: string;
  category: {
    id: number;
  };
  price: number;
  description: string;
};
