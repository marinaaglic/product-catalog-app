import {
  createContext,
  useEffect,
  useState,
  ReactNode,
  useContext,
} from "react";
import { fetchCategories } from "../utils/api/api";
import { Category } from "../utils/types";

type CategoryContextType = {
  categories: Category[];
};

const CategoryContext = createContext<CategoryContextType | undefined>(
  undefined
);

export const CategoryProvider = ({ children }: { children: ReactNode }) => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const getCategories = async () => {
      const data = await fetchCategories();
      if (data) {
        setCategories(data);
      }
    };
    getCategories();
  }, []);
  return (
    <CategoryContext.Provider value={{ categories }}>
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategoryContext = () => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error("useProductContext must be used within a ProductProvider");
  }
  return context;
};
