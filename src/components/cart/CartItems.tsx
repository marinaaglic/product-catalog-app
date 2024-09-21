import { useAuth } from "../../context/AuthContext";

export default function CartItems() {
  const { removeFromCart, cartItems } = useAuth();

  return (
    <div>
      {cartItems.map((item) => (
        <ul key={item.id}>
          <li>{item.title}</li>
          <li>{item.price}</li>
        </ul>
      ))}
    </div>
  );
}
