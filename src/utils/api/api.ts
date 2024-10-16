import axios, { AxiosInstance, AxiosResponse } from "axios";
import { Product, Category } from "../types/product";
import { AuthResponse, LoginCredentials } from "../types/user";

interface ProductResponse {
  products: Product[];
  total: number;
}

const api: AxiosInstance = axios.create({
  baseURL: "https://dummyjson.com/",
});

export async function fetchProducts(
  limit: number = 20,
  skip: number = 0
): Promise<ProductResponse | string> {
  try {
    const response: AxiosResponse<ProductResponse> = await api.get(
      `/products?limit=${limit}&skip=${skip}`
    );
    return response.data;
  } catch (error) {
    console.log("Error fetching data: ", error);
    return "Unable to fetch products. Please try again later.";
  }
}

export async function fetchCategories(): Promise<Category[] | string> {
  try {
    const response: AxiosResponse<Category[]> = await api.get(
      "/products/categories"
    );
    return response.data;
  } catch (error) {
    console.log("Error fetching data: ", error);
    return "Unable to fetch categories. Please try again later.";
  }
}

export async function loginUser(
  credentials: LoginCredentials,
  setAuthenticated: (value: boolean) => void
) {
  try {
    const response: AxiosResponse<AuthResponse> = await api.post(
      "/auth/login",
      credentials
    );
    const { accessToken, refreshToken, id } = response.data;
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("userId", id.toString());
    setAuthenticated(true);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function refreshAccessToken() {
  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) {
    return null;
  }

  try {
    const { data } = await api.post("auth/refresh", {
      refreshToken: refreshToken,
      expiresInMins: 30,
    });
    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);
    return data.accessToken;
  } catch (error: any) {
    console.log("Failed to refresh token:", error.response?.data || error);
    return null;
  }
}

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const accessToken = await refreshAccessToken();
        if (!accessToken) {
          throw new Error("Unable to refresh token");
        }

        originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
        return api(originalRequest);
      } catch (error) {
        console.log("Refresh token is invalid, logging out.");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export async function searchProducts(
  query: string
): Promise<ProductResponse | undefined> {
  try {
    const response: AxiosResponse<ProductResponse> = await api.get(
      `/products/search?q=${query}`
    );
    return response.data;
  } catch (error) {
    console.log("An error occurred.", error);
  }
}
