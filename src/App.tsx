import "./App.css";
import AppRoutes from "./routes/AppRoutes";
import { ProductProvider } from "./context/ProductContext";
import { AuthProvider } from "./context/UserContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <AuthProvider>
      <ProductProvider>
        <ToastContainer position="top-right" autoClose={5000} />
        <AppRoutes />
      </ProductProvider>
    </AuthProvider>
  );
}

export default App;
