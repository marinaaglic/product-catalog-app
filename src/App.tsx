import "./App.css";
import ProductGrid from "./components/product/ProductGrid";
import { ProductProvider } from "./context/ProductContext";

function App() {
  return (
    <ProductProvider>
      <ProductGrid />
    </ProductProvider>
  );
}

export default App;
