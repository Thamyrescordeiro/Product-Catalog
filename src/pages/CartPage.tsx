import { useState } from "react";
import { useCart } from "../contexts/CartContext";
import styles from "./CartPage.module.css";
import { FaTrash, FaPlus, FaMinus } from "react-icons/fa";

function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");

  const totalValue = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  const handleFinishOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      alert("Seu carrinho está vazio!");
      return;
    }
    if (!customerName || !customerPhone) {
      alert("Por favor, preencha seu nome e telefone.");
      return;
    }

    const myPhoneNumber = "5581997389529";
    let orderSummary = "Olá, gostaria de fazer o seguinte pedido:\n\n";

    cartItems.forEach((item) => {
      orderSummary += `*Produto:* ${item.product.name}\n`;
      orderSummary += `*Categoria:* ${item.product.category}\n`;
      orderSummary += `*Quantidade:* ${item.quantity}\n`;
      orderSummary += `*Preço Un.:* R$ ${item.product.price.toFixed(2)}\n`;
      orderSummary += `------------------------\n`;
    });

    orderSummary += `\n*VALOR TOTAL: R$ ${totalValue.toFixed(2)}*\n`;
    orderSummary += `\n*Cliente:* ${customerName}\n`;
    orderSummary += `*Telefone:* ${customerPhone}`;

    const whatsappUrl = `https://wa.me/${myPhoneNumber}?text=${encodeURIComponent(
      orderSummary
    )}`;

    window.open(whatsappUrl, "_blank");
    clearCart();
    setCustomerName("");
    setCustomerPhone("");
  };

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Meu Carrinho</h1>
      <div className={styles.cartContainer}>
        <div className={styles.cartItems}>
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div key={item.product.id} className={styles.cartItem}>
                <img
                  src={item.product.imageUrl}
                  alt={item.product.name}
                  className={styles.itemImage}
                />
                <div className={styles.itemDetails}>
                  <p className={styles.itemName}>{item.product.name}</p>
                  <p className={styles.itemPrice}>
                    R$ {item.product.price.toFixed(2)}
                  </p>
                </div>
                <div className={styles.quantityControl}>
                  <button
                    onClick={() =>
                      updateQuantity(item.product.id, item.quantity - 1)
                    }
                  >
                    <FaMinus />
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() =>
                      updateQuantity(item.product.id, item.quantity + 1)
                    }
                  >
                    <FaPlus />
                  </button>
                </div>
                <button
                  onClick={() => removeFromCart(item.product.id)}
                  className={styles.removeButton}
                >
                  <FaTrash />
                </button>
              </div>
            ))
          ) : (
            <p>Seu carrinho está vazio.</p>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className={styles.checkoutSection}>
            <h2>Resumo do Pedido</h2>
            <div className={styles.total}>
              <span>Valor Total:</span>
              <span>R$ {totalValue.toFixed(2)}</span>
            </div>
            <form onSubmit={handleFinishOrder} className={styles.form}>
              <h3>Seus Dados</h3>
              <input
                type="text"
                placeholder="Seu nome completo"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                required
              />
              <input
                type="tel"
                placeholder="Seu WhatsApp (ex: 81912345678)"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                required
              />
              <button type="submit" className={styles.finishButton}>
                FINALIZAR COMPRA NO WHATSAPP
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default CartPage;
