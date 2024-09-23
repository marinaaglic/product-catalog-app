import axios, { AxiosResponse } from "axios";
import { Product, Category } from "../types/product";
import { AuthResponse, LoginCredentials } from "../types/user";

interface ProductResponse {
  products: Product[];
  total: number;
}

export async function fetchProducts(
  limit: number = 194
): Promise<ProductResponse | undefined> {
  try {
    const response: AxiosResponse<ProductResponse> = await axios.get(
      `https://dummyjson.com/products?limit=${limit}`
    );
    return response.data;
  } catch (error) {
    console.log("Error fetching data: ", error);
    return;
  }
}

export async function fetchCategories(): Promise<Category[] | undefined> {
  try {
    const response: AxiosResponse<Category[]> = await axios.get(
      "https://dummyjson.com/products/categories"
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
    const response: AxiosResponse<AuthResponse> = await axios.post(
      "https://dummyjson.com/auth/login",
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
