import { useState } from "react";
import { mockProducts } from "../data/products";
import ProductCard from "../components/ProductCard";
import styles from "./CatalogPage.module.css";

function CatalogPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const filteredProducts = mockProducts
    .filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((product) =>
      selectedCategory ? product.category === selectedCategory : true
    );

  const categories = [...new Set(mockProducts.map((p) => p.category))];

  return (
    <div className={styles.page}>
      <h2 className={styles.pageTitle}>Catálogo de produtos</h2>

      <div className={styles.filterBar}>
        <input
          type="text"
          placeholder="Pesquisar Produto"
          className={styles.searchInput}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className={styles.categorySelect}
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">Categorias</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <button
          className={styles.clearButton}
          onClick={() => {
            setSelectedCategory("");
            setSearchTerm("");
          }}
        >
          LIMPAR FILTRO
        </button>
      </div>

      <div className={styles.productList}>
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default CatalogPage;
