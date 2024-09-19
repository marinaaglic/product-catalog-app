import axios, { AxiosResponse } from "axios";
import { Product, Category } from "../types";

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
