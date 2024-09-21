import { useState } from "react";
import ProductCard from "./ProductCard";
import { Product } from "../../utils/types";
import "../../styles/_productGrid.scss";
import Modal from "../reusable/Modal";
import ProductDetails from "./ProductDetails";

export default function ProductGrid({ products }: { products: Product[] }) {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const openModal = (product: Product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedProduct(null);
  };
  const handleAddToCart = () => {};
  return (
    <div>
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
