import { Product } from "../../utils/types/product";
import "../../styles/_productCard.scss";
import Modal from "../reusable/Modal";
import { useState } from "react";
import Button from "../reusable/Button";
import { refreshAccessToken } from "../../utils/api/api";
import Input from "../reusable/Input";

interface ProductCardProps {
  product: Product;
  onShowDetails: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

export default function ProductCard({
  product,
  onShowDetails,
  onAddToCart,
}: ProductCardProps) {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [quantity, setQuantity] = useState<number>(1);

  const handleAddToCart = async () => {
    const savedToken = localStorage.getItem("accessToken");
    if (!savedToken) {
      const newAccessToken = await refreshAccessToken();
      if (!newAccessToken) {
        setModalOpen(true);
        return;
      }
    }
    onAddToCart(product, quantity);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const truncatedDescription =
    product.description.length > 100
      ? product.description.slice(0, 100) + "..."
      : product.description;

  return (
    <div className="product-card">
      <img src={product.thumbnail} alt={product.title} loading="lazy" />
      <h2>{product.title}</h2>
      <p>{truncatedDescription}</p>
      <p>Price: ${product.price.toFixed(2)}</p>
      <Button onClick={onShowDetails} variant="primary">
        {" "}
        Show details
      </Button>
      <div className="quantity-div">
        <Input
          type="number"
          id={product.id.toString()}
          name={product.id.toString()}
          variant="range-input"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          min={1}
        />
        <Button onClick={handleAddToCart} variant="primary">
          Add to cart
        </Button>
      </div>

      {modalOpen && (
        <Modal
          title="Login Required"
          buttonText="Close"
          open={modalOpen}
          onClose={closeModal}
        >
          <p className="modal-text">
            {" "}
            You have to be logged in to add items to cart! You can login{" "}
            <a href="/login">here</a>.
          </p>
        </Modal>
      )}
    </div>
  );
}
