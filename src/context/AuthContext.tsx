import {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
} from "react";

type AuthContextType = {
  isAuthenticated: boolean;
  checkToken: (token: string) => void;
  setAuthenticated: (value: boolean) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const setAuthenticated = (value: boolean) => {
    setIsAuthenticated(value);
  };

  const checkToken = (token: string) => {
    localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  };
  return (
    <AuthContext.Provider
      value={{ isAuthenticated, checkToken, setAuthenticated }}
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
