import { Product } from "../../utils/types/product";
import "../../styles/_productCard.scss";
import { useAuth } from "../../context/AuthContext";
import Modal from "../reusable/Modal";
import { useState } from "react";
import Button from "../reusable/Button";

interface ProductCardProps {
  product: Product;
  onShowDetails: () => void;
  onAddToCart: (product: Product) => void;
}

export default function ProductCard({
  product,
  onShowDetails,
  onAddToCart,
}: ProductCardProps) {
  const { isAuthenticated } = useAuth();
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      setModalOpen(true);
    } else {
      onAddToCart(product);
    }
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
      <img src={product.thumbnail} alt={product.title} />
      <h2>{product.title}</h2>
      <p>{truncatedDescription}</p>
      <p>Price: ${product.price.toFixed(2)}</p>
      <Button className="btn-show-details" onClick={onShowDetails}>
        {" "}
        Show details
      </Button>
      <Button className="btn-add-to-cart" onClick={handleAddToCart}>
        Add to cart
      </Button>
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
