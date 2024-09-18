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
};

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        if (data) {
          setProducts(data.products);
        }
      } catch (error) {
        console.log("Error fetching products, ", error);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);
  return (
    <ProductContext.Provider value={{ products, loading }}>
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
