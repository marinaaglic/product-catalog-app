import { Product } from "../../utils/types";
import "../../styles/_productCard.scss";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const truncatedDescription =
    product.description.length > 100
      ? product.description.slice(0, 100) + "..."
      : product.description;
  return (
    <div className="product-card">
      <img src={product.thumbnail} alt={product.title} />
      <h2>{product.title}</h2>
      <p>{truncatedDescription}</p>
      <p>Price: ${product.price.toFixed(2)}</p>
      <button className="btn-show-details"> Show details</button>
    </div>
  );
}
