import { useParams, useNavigate } from "react-router-dom";
import { mockProducts } from "../../data/products";
import styles from "./ProductDetailPage.module.css";
import { IoArrowBack } from "react-icons/io5";
import type { Product } from "../../types/CartAndOrderTypes";

function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const product = mockProducts.find((p: Product) => p.id === Number(id));

  if (!product) {
    return (
      <div className={styles.page}>
        <h1>Produto não encontrado!</h1>
      </div>
    );
  }

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.backAction}>
          <button onClick={handleGoBack} className={styles.backButton}>
            <IoArrowBack size={24} />
            <span>VOLTAR</span>
          </button>
        </div>
        <div className={styles.productDetails}>
          <div className={styles.imageContainer}>
            <img
              src={product.imageUrl}
              alt={product.name}
              className={styles.productImage}
            />
          </div>
          <div className={styles.infoContainer}>
            <h1 className={styles.productName}>{product.name}</h1>
            <p className={styles.productPrice}>
              R$ {product.price.toFixed(2).replace(".", ",")}
            </p>
            <div className={styles.description}>
              <h2 className={styles.descriptionTitle}>Descrição</h2>
              <p className={styles.descriptionText}>{product.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;
