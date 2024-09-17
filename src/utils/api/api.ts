import axios, { AxiosResponse } from "axios";
import { Product } from "../types";

interface ProductResponse {
  products: Product[];
}

export async function fetchProducts(): Promise<ProductResponse | undefined> {
  try {
    const response: AxiosResponse<ProductResponse> = await axios.get(
      "https://dummyjson.com/products"
    );
    return response.data;
  } catch (error) {
    console.log("Error fetching data: ", error);
    return;
  }
}
