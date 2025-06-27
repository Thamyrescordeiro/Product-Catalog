import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { FavoritesProvider } from "./contexts/FavoritesContext";
import { CartProvider } from "./contexts/CartContext";

import Header from "./components/header/Header";
import LandingPage from "./pages/landingPage/LandingPage";
import CatalogPage from "./pages/catalogPage/CatalogPage";
import FavoritesPage from "./pages/favoritesPage/FavoritesPage";
import ProductDetailPage from "./pages/productDetailPage/ProductDetailPage";
import CartPage from "./pages/CartPage/CartPage";
import OrderHistoryPage from "./pages/OrderHistoryPage/OrderHistoryPage"; // Importar nova página

function App() {
  return (
    <CartProvider>
      <FavoritesProvider>
        <Router>
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/catalog" element={<CatalogPage />} />
              <Route path="/favorites" element={<FavoritesPage />} />
              <Route path="/product/:id" element={<ProductDetailPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/orders" element={<OrderHistoryPage />} />{" "}
              {/* NOVA ROTA */}
            </Routes>
          </main>
        </Router>
      </FavoritesProvider>
    </CartProvider>
  );
}

export default App;
