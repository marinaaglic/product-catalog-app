import { useAuth } from "../../context/AuthContext";
import { FaTrashAlt } from "react-icons/fa";
import "../../styles/_cartItems.scss";

export default function CartItems() {
  const { cartItems, removeFromCart } = useAuth();

  return (
    <div className="cart-wrapper">
      {cartItems.length > 0 ? (
        cartItems.map((item) => (
          <div key={item.id} className="items-div">
            <p>{item.title} </p>
            <p>
              {item.price}${item.quantity}
            </p>

            <FaTrashAlt
              className="delete-icon"
              onClick={() => removeFromCart(item.id)}
            />
          </div>
        ))
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
}
