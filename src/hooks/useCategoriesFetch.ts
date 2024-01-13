import { useState, useEffect } from "react";
import type { Category } from "../types/Category";
import axios from "../api";

export const useCategoriesFetch = (title?: string) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoriesError, setCategoriesError] = useState();

  const fetchCategories = async (title?: string) => {
    try {
      const options = {
        params: {
          title,
        },
      };

      const res = await axios.get("/appinfo/categories", options);
      if (res.data) {
        setCategories(res.data);
      }
    } catch (error) {
      setCategoriesError(error);
    }
  };

  useEffect(() => {
    fetchCategories(title);
  }, [title]);

  return { categories, categoriesError };
};
