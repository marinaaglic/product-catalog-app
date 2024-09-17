import { useState, useEffect } from "react";
import { fetchProducts } from "../../utils/api/api";
import ProductCard from "./ProductCard";
import { Product } from "../../utils/types";
import "../../styles/_productGrid.scss";

export default function ProductGrid() {
  const [products, setProducts] = useState<Product[] | undefined>([]);
  useEffect(() => {
    const loadProducts = async () => {
      const data = await fetchProducts();
      if (data) {
        setProducts(data.products);
      }
    };
    loadProducts();
  }, []);
  if (!products) {
    return <div>Loading...</div>;
  }
  return (
    <div className="grid-product">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
