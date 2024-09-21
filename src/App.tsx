import "./App.css";
import ProductPage from "./pages/ProductPage";
import { ProductProvider } from "./context/ProductContext";

function App() {
  return (
    <ProductProvider>
      <ProductPage />
    </ProductProvider>
  );
}

export default App;
