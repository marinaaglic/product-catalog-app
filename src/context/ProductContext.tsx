import {
  createContext,
  useEffect,
  useState,
  ReactNode,
  useContext,
} from "react";
import { fetchProducts } from "../utils/api/api";
import { Product } from "../utils/types";

type ProductContextType = {
  products: Product[];
  loading: boolean;
  error: string | null;
};

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        if (data) {
          setProducts(data.products);
        }
      } catch (error) {
        setError("Error getting products.");
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);
  return (
    <ProductContext.Provider value={{ products, loading, error }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProductContext must be used within a ProductProvider");
  }
  return context;
};
