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
): Promise<ProductResponse | undefined> {
  try {
    const response: AxiosResponse<ProductResponse> = await api.get(
      `/products?limit=${limit}&skip=${skip}`
    );
    return response.data;
  } catch (error) {
    console.log("Error fetching data: ", error);
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
    console.log("Error fetching data: ", error);
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
    console.log("An error occurred.", error);
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
    console.log("An error occurred.", error);
  }
}
