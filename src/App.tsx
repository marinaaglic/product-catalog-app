import "./App.css";
import ProductPage from "./pages";
import { ProductProvider } from "./context/ProductContext";

function App() {
  return (
    <ProductProvider>
      <ProductPage />
    </ProductProvider>
  );
}

export default App;
