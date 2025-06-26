import React, { useState } from "react";
import type { Product } from "../types/Product";
import styles from "./ProductCard.module.css";
import { useFavorites } from "../contexts/FavoritesContext";
import { useCart } from "../contexts/CartContext";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./CartPopup.css";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const { favorites, toggleFavorite } = useFavorites();
  const isFavorited = favorites.some((fav) => fav.id === product.id);

  const [showCartPopup, setShowCartPopup] = useState(false);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleFavorite(product);
  };

  const handleAddToCart = () => {
    addToCart(product);
    setShowCartPopup(true);
    setTimeout(() => {
      setShowCartPopup(false);
    }, 3000);
  };

  return (
    <div className={styles.cardWrapper}>
      <button
        className={`${styles.favoriteButton} ${
          isFavorited ? styles.favorited : ""
        }`}
        onClick={handleFavoriteClick}
        aria-label={
          isFavorited ? "Remover dos Favoritos" : "Adicionar aos Favoritos"
        }
      >
        {isFavorited ? <FaHeart /> : <FaRegHeart />}
      </button>

      <Link to={`/product/${product.id}`} className={styles.card}>
        <img
          src={product.imageUrl}
          alt={product.name}
          className={styles.cardImage}
        />
        <div className={styles.cardBody}>
          <h3 className={styles.cardTitle}>{product.name}</h3>
          <p className={styles.cardPrice}>
            R$ {product.price.toFixed(2).replace(".", ",")}
          </p>
        </div>
      </Link>
      <button className={styles.addButton} onClick={handleAddToCart}>
        ADICIONAR PRODUTO
      </button>

      {showCartPopup && (
        <div className="cart-popup-container">
          <div className="cart-popup-content">
            <span className="cart-popup-icon">&#10003;</span>
            <p>Adicionado ao carrinho!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
