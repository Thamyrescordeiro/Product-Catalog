import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FiMenu, FiX, FiShoppingCart, FiHeart } from "react-icons/fi";
import { IoReceipt } from "react-icons/io5";
import styles from "./Header.module.css";

import { useCart } from "../../contexts/CartContext";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { totalCartItems } = useCart(); // Correção: de cartTotal para totalCartItems

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className={styles.mainHeader}>
      <div className={styles.logoText}>
        <NavLink to="/" onClick={closeMenu}>
          <h1>JTSHOP</h1>
        </NavLink>
      </div>

      <nav className={styles.desktopNav}>
        <ul className={styles.navList}>
          <li>
            <NavLink
              to="/catalog"
              className={({ isActive }) =>
                isActive ? styles.activeLink : styles.inactiveLink
              }
            >
              CATÁLOGO
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/favorites"
              className={({ isActive }) =>
                isActive ? styles.activeLink : styles.inactiveLink
              }
            >
              <FiHeart size={18} /> FAVORITOS
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/orders"
              className={({ isActive }) =>
                isActive ? styles.activeLink : styles.inactiveLink
              }
            >
              <IoReceipt size={18} /> MEUS PEDIDOS
            </NavLink>
          </li>
          <li className={styles.cartLinkContainer}>
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                isActive ? styles.activeLink : styles.inactiveLink
              }
            >
              <span className={styles.cartIconWrapper}>
                <FiShoppingCart size={18} />
                {totalCartItems > 0 && (
                  <span className={styles.cartBadge}>{totalCartItems}</span>
                )}
              </span>
              CARRINHO
            </NavLink>
          </li>
        </ul>
      </nav>

      <div className={styles.rightSection}>
        <div className={styles.cartLinkContainerMobile}>
          <NavLink
            to="/cart"
            className={styles.inactiveLink}
            onClick={closeMenu}
          >
            <span className={styles.cartIconWrapper}>
              <FiShoppingCart size={24} />
              {totalCartItems > 0 && (
                <span className={styles.cartBadge}>{totalCartItems}</span>
              )}
            </span>
          </NavLink>
        </div>

        <div className={styles.hamburgerButton}>
          <button onClick={toggleMenu}>
            {isMenuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <nav className={styles.mobileNav}>
          <ul className={styles.mobileNavList}>
            <li>
              <NavLink to="/" end onClick={closeMenu}>
                INÍCIO
              </NavLink>
            </li>
            <li>
              <NavLink to="/catalog" onClick={closeMenu}>
                CATÁLOGO
              </NavLink>
            </li>
            <li>
              <NavLink to="/favorites" onClick={closeMenu}>
                FAVORITOS
              </NavLink>
            </li>
            <li>
              <NavLink to="/orders" onClick={closeMenu}>
                MEUS PEDIDOS
              </NavLink>
            </li>
            <li>
              <NavLink to="/cart" onClick={closeMenu}>
                CARRINHO
              </NavLink>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
