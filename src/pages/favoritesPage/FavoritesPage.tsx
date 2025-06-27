import { useNavigate } from "react-router-dom";
import { useFavorites } from "../../contexts/FavoritesContext";
import ProductCard from "../../components/productCard/ProductCard";
import styles from "./FavoritesPage.module.css";
import { IoArrowBack } from "react-icons/io5";

function FavoritesPage() {
  const { favorites } = useFavorites();
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <button onClick={handleGoBack} className={styles.backButton}>
          <IoArrowBack size={24} />
          <span>VOLTAR</span>
        </button>
        <h1 className={styles.title}>Meus Favoritos</h1>
      </div>

      {favorites.length > 0 ? (
        <div className={styles.favoritesGrid}>
          {favorites.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className={styles.emptyMessage}>
          Você ainda não adicionou nenhum produto aos favoritos.
        </p>
      )}
    </div>
  );
}

export default FavoritesPage;
