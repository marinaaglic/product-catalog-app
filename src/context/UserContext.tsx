import {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
} from "react";

import { Product } from "../utils/types/product";
import { refreshAccessToken } from "../utils/api/api";

type AuthType = {
  isAuthenticated: boolean;
  setAuthenticated: (value: boolean) => void;
  logout: () => void;
};

type CartType = {
  cartItems: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  getTotalItems: () => number;
  getTotalAmount: () => number;
};

type UserContextType = AuthType & CartType;

const UserContext = createContext<UserContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<Product[]>([]);

  useEffect(() => {
    const checkAuthentication = async () => {
      const savedToken = localStorage.getItem("accessToken");
      const storedUserId = localStorage.getItem("userId");

      if (!savedToken) {
        const newAccessToken = await refreshAccessToken();
        if (!newAccessToken) {
          setIsAuthenticated(false);
          return;
        }
      }
      setIsAuthenticated(true);

      if (storedUserId) {
        const userCart = localStorage.getItem(`cart_${storedUserId}`);
        if (userCart) {
          setCartItems(JSON.parse(userCart));
        }
      }
    };

    checkAuthentication();
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
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (item) => item.id === product.id
      );

      if (existingItemIndex !== -1) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: (updatedItems[existingItemIndex].quantity || 1) + 1,
        };
        return updatedItems;
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
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
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userId");
    setIsAuthenticated(false);
    setCartItems([]);
  };

  const getTotalItems = () => {
    return cartItems.length;
  };

  const getTotalAmount = () => {
    return cartItems.reduce((total, item) => {
      const quantity = item.quantity || 1;
      return total + item.price * quantity;
    }, 0);
  };

  return (
    <UserContext.Provider
      value={{
        isAuthenticated,
        setAuthenticated,
        cartItems,
        addToCart,
        removeFromCart,
        logout,
        getTotalItems,
        getTotalAmount,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
