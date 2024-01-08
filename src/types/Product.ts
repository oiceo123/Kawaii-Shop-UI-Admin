export type Product = {
  id: string;
  title: string;
  price: number;
  description: string;
  category: {
    id: number;
    title: string;
  };
  images: {
    id: string;
    filename: string;
    url: string;
  }[];
  created_at: string;
  updated_at: string;
};
