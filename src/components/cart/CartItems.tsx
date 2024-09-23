import { useUserContext } from "../../context/UserContext";
import { FaTrashAlt } from "react-icons/fa";
import "../../styles/_cartItems.scss";

export default function CartItems() {
  const { cartItems, removeFromCart, getTotalItems, getTotalAmount } =
    useUserContext();

  const totalItems = getTotalItems();
  const totalAmount = getTotalAmount();

  return (
    <div className="cart-wrapper">
      <div className="header">
        <span>Product</span>
        <span>Price</span>
        <span>Quantity</span>
      </div>
      {cartItems.length > 0 ? (
        cartItems.map((item) => (
          <div key={item.id} className="items-div">
            <FaTrashAlt
              className="delete-icon"
              onClick={() => removeFromCart(item.id)}
            />
            <p className="product-name">{item.title}</p>
            <p className="product-price">${item.price.toFixed(2)}</p>
            <p className="product-quantity">{item.quantity || 1}</p>
          </div>
        ))
      ) : (
        <p>Your cart is empty.</p>
      )}
      <div className="total-products">
        <span>Total products:</span>
        <span>{totalItems}</span>
        <span>Total amount:</span>
        <span>${totalAmount.toFixed(2)}</span>
      </div>
    </div>
  );
}
