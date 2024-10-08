import {
  createContext,
  useEffect,
  useState,
  ReactNode,
  useContext,
} from "react";
import { fetchProducts } from "../utils/api/api";
import { Product } from "../utils/types/product";

type ProductContextType = {
  products: Product[];
  loading: boolean;
  currentPage: number;
  totalProducts: number;
  error: string | null;
  setCurrentPage: (page: number) => void;
};

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalProducts, setTotalProducts] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  const productsPerPage = 20;

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const skip = (currentPage - 1) * productsPerPage;
        const data = await fetchProducts(productsPerPage, skip);
        if (typeof data === "string") {
          setError(data);
        } else if (data) {
          setProducts(data.products);
          setTotalProducts(data.total);
        }
      } catch (error) {
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, [currentPage]);
  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        currentPage,
        totalProducts,
        error,
        setCurrentPage,
      }}
    >
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
