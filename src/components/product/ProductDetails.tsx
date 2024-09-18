import { Product } from "../../utils/types";

export default function ProductDetails(product: Product) {
  return (
    <div className="product-details">
      <img src={product.images[0]} alt={product.title} />
      <h3>{product.title}</h3>
      <p>{product.description}</p>
      <p>Price: ${product.price.toFixed(2)}</p>
      <p>Category: {product.category}</p>
      <p>Rating: {product.rating}</p>
      <p>Stock: {product.stock}</p>
      <p>Availability status: {product.availabilityStatus}</p>
      <p>Warranty: {product.warrantyInformation}</p>
      <p>Shipping: {product.shippingInformation}</p>
      <p>Return Policy: {product.returnPolicy}</p>
    </div>
  );
}
