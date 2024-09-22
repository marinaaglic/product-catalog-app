import {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
} from "react";

import { Product } from "../utils/types/product";

type AuthType = {
  isAuthenticated: boolean;
  setAuthenticated: (value: boolean) => void;
  logout: () => void;
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
  const [cartItems, setCartItems] = useState<Product[]>([]);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const storedUserId = localStorage.getItem("userId");

    if (savedToken) {
      setIsAuthenticated(true);

      if (storedUserId) {
        const userCart = localStorage.getItem(`cart_${storedUserId}`);
        if (userCart) {
          setCartItems(JSON.parse(userCart));
        }
      }
    }
  }, []);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      localStorage.setItem(`cart_${storedUserId}`, JSON.stringify(cartItems));
    }
  }, [cartItems]);

  const setAuthenticated = (value: boolean) => {
    setIsAuthenticated(value);
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      const userCart = localStorage.getItem(`cart_${storedUserId}`);
      if (userCart) {
        setCartItems(JSON.parse(userCart));
      }
    }
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

  const logout = () => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      localStorage.setItem(`cart_${storedUserId}`, JSON.stringify(cartItems));
    }
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setIsAuthenticated(false);
    setCartItems([]);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setAuthenticated,
        cartItems,
        addToCart,
        removeFromCart,
        logout,
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
