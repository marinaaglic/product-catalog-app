import "./App.css";
import ProductGrid from "./components/product/ProductGrid";
import { ProductProvider } from "./context/ProductContext";
import { CategoryProvider } from "./context/CategoryContext";

function App() {
  return (
    <ProductProvider>
      <CategoryProvider>
        <ProductGrid />
      </CategoryProvider>
    </ProductProvider>
  );
}

export default App;
