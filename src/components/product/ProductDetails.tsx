import { Product } from "../../utils/types";

export default function ProductDetails({ product }: { product: Product }) {
  return (
    <div className="product-details">
      <img src={product.images[0]} alt={product.title} />
      <p>{product.description}</p>
      <p>
        <strong>Price:</strong> ${product.price.toFixed(2)}
      </p>
      <p>
        <strong>Category:</strong> {product.category}
      </p>
      <p>
        <strong>Rating:</strong> {product.rating}
      </p>
      <p>
        <strong>Stock:</strong> {product.stock}
      </p>
      <p>
        <strong>Availability status:</strong> {product.availabilityStatus}
      </p>
      <p>
        <strong>Warranty:</strong> {product.warrantyInformation}
      </p>
      <p>
        <strong>Shipping:</strong> {product.shippingInformation}
      </p>
      <p>
        <strong>Return Policy:</strong> {product.returnPolicy}
      </p>
    </div>
  );
}
