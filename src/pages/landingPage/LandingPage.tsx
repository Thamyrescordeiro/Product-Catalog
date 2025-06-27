import { Link } from "react-router-dom";
import styles from "./LandingPage.module.css";
import mainImage from "../../assets/inicio.png";

function LandingPage() {
  return (
    <div className={styles.homeContainer}>
      <div className={styles.homeContent}>
        <div className={styles.info}>
          <h1 className={styles.homeTitle}>
            Conheça o melhor <br /> catálogo de produtos
          </h1>
          <p className={styles.homeSubtitle}>
            Ajudaremos você a encontrar os melhores <br /> produtos disponíveis
            no mercado.
          </p>
          <Link to="/catalog" className={styles.homeButton}>
            <span className={styles.buttonText}>INICIE AGORA A SUA BUSCA</span>
          </Link>
        </div>
        <div className={styles.homeImage}>
          <img src={mainImage} alt="Apresentação do Catálogo" />
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
