import { useAuth } from "../../context/AuthContext";
import { FaTrashAlt } from "react-icons/fa";

export default function CartItems() {
  const { cartItems, removeFromCart } = useAuth();

  return (
    <div>
      {cartItems.length > 0 ? (
        cartItems.map((item) => (
          <ul key={item.id}>
            <li>
              {item.title}
              {item.quantity}
              <FaTrashAlt
                className="delete-icon"
                onClick={() => removeFromCart(item.id)}
              />
            </li>
            <li>{item.price}</li>
          </ul>
        ))
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
}
