import {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
} from "react";

import { Product } from "../utils/types";

type AuthType = {
  isAuthenticated: boolean;
  setAuthenticated: (value: boolean) => void;
};

type CartType = {
  cartItems: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
};

type AuthContextType = AuthType & CartType;

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<Product[]>(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);

    const storedCartItems = localStorage.getItem("cart");
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const setAuthenticated = (value: boolean) => {
    setIsAuthenticated(value);
  };

  const addToCart = (product: Product) => {
    setCartItems((prevItems) => [...prevItems, product]);
  };

  const removeFromCart = (productId: number) => {
    const isItemInCart = cartItems.find((item) => item.id === productId);
    if (isItemInCart) {
      setCartItems(cartItems.filter((item) => item.id !== productId));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setAuthenticated,
        cartItems,
        addToCart,
        removeFromCart,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
