import { Product } from "../../utils/types";
import "../../styles/_productCard.scss";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="product-card">
      <img src={product.thumbnail} alt={product.title} />
      <h2>{product.title}</h2>
      <p>{product.description}</p>
      <p>Price: ${product.price.toFixed(2)}</p>
      <p>Discount: {product.discountPercentage}%</p>
      <p>Rating: {product.rating}</p>
      <p>Stock: {product.stock}</p>
      <p>Category: {product.category}</p>
      <p>Brand: {product.brand}</p>
      <button> Show details</button>
    </div>
  );
}
