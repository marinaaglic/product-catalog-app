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

function getErrorMessage(error: any): string {
  if (axios.isAxiosError(error) && error.response) {
    return `Error ${error.response.status}: ${error.response.statusText}`;
  }
  return "An unexpected error occurred.";
}

export async function fetchProducts(
  limit: number = 20,
  skip: number = 0
): Promise<ProductResponse | undefined> {
  try {
    const response: AxiosResponse<ProductResponse> = await api.get(
      `/products?limit=${limit}&skip=${skip}`
    );
    return response.data;
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    alert(`Failed to fetch products. ${errorMessage}`);
    return;
  }
}

export async function fetchCategories(): Promise<Category[] | undefined> {
  try {
    const response: AxiosResponse<Category[]> = await api.get(
      "/products/categories"
    );
    return response.data;
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    alert(`Failed to fetch categories. ${errorMessage}`);
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
    const { accessToken, id } = response.data;
    localStorage.setItem("token", accessToken);
    localStorage.setItem("userId", id.toString());
    setAuthenticated(true);
    return response.data;
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    alert(`Login failed. ${errorMessage}`);
  }
}

export async function searchProducts(
  query: string
): Promise<ProductResponse | undefined> {
  try {
    const response: AxiosResponse<ProductResponse> = await api.get(
      `/products/search?q=${query}`
    );
    return response.data;
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    alert(`Search failed. ${errorMessage}`);
  }
}
