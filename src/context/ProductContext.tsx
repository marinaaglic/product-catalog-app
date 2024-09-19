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
  currentPage: number;
  totalProducts: number;
  setCurrentPage: (page: number) => void;
};

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalProducts, setTotalProducts] = useState<number>(0);

  const productsPerPage = 20;

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const skip = (currentPage - 1) * productsPerPage;
        const data = await fetchProducts(skip, productsPerPage);
        if (data) {
          setProducts(data.products);
          setTotalProducts(data.total);
        }
      } catch (error) {
        console.log("Error fetching products, ", error);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, [currentPage]);
  return (
    <ProductContext.Provider
      value={{ products, loading, currentPage, totalProducts, setCurrentPage }}
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
