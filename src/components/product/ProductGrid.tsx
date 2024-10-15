import { useState } from "react";
import ProductCard from "./ProductCard";
import { Product } from "../../utils/types/product";
import "../../styles/_productGrid.scss";
import Modal from "../reusable/Modal";
import ProductDetails from "./ProductDetails";
import { useUserContext } from "../../context/UserContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ProductGrid({ products }: { products: Product[] }) {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { addToCart } = useUserContext();

  const openModal = (product: Product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedProduct(null);
  };

  const handleAddToCart = (product: Product, quantity: number) => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    toast.success(
      `${quantity} ${quantity === 1 ? "item" : "items"} added to your cart!`
    );
  };

  return (
    <div>
      <ToastContainer />
      <div className="grid-product">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onShowDetails={() => openModal(product)}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>
      {selectedProduct && (
        <Modal
          title={selectedProduct.title}
          buttonText="OK"
          open={modalOpen}
          onClose={closeModal}
        >
          <ProductDetails product={selectedProduct} />
        </Modal>
      )}
    </div>
  );
}
