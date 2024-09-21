import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import ProductPage from "../pages/ProductPage";
import LoginPage from "../pages/LoginPage";

export default function AppRoutes() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<ProductPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Router>
    </div>
  );
}
