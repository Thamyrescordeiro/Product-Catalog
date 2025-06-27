import React, { useRef } from "react"; // useState removido
import { useNavigate } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";
import styles from "./CartPage.module.css";
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";
import { IoArrowBack } from "react-icons/io5";
import type { CartItem } from "../../types/CartAndOrderTypes";

const CartPage: React.FC = () => {
  const {
    cart,
    cartTotal,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
    addOrder,
  } = useCart();
  const nameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const myPhoneNumber = "5581997389529";

  const handleFinishPurchase = (e: React.FormEvent) => {
    e.preventDefault();

    if (cart.length === 0) {
      alert("Seu carrinho está vazio!");
      return;
    }

    const newOrder = {
      id: new Date().getTime().toString(),
      date: new Date().toLocaleString("pt-BR"),
      total: cartTotal,
      // Correção: Mapeamento simples para garantir todas as propriedades
      items: cart.map((item: CartItem) => ({ ...item })),
      status: "completed" as const,
    };

    addOrder(newOrder);
    clearCart();

    const customerName = nameRef.current?.value || "Não Informado";
    const customerPhone = phoneRef.current?.value || "Não Informado";

    let message = `Olá, gostaria de fazer o seguinte pedido (ID: ${newOrder.id}):\n\n`;

    newOrder.items.forEach((item) => {
      message += `*Produto:* ${item.name}\n`;
      message += `*Categoria:* ${item.category}\n`;
      message += `*Quantidade:* ${item.quantity}\n`;
      message += `*Preço Un.:* R$ ${(item.price * item.quantity)
        .toFixed(2)
        .replace(".", ",")}\n`;
      message += `------------------------\n\n`;
    });

    message += `*VALOR TOTAL: R$ ${newOrder.total
      .toFixed(2)
      .replace(".", ",")}*\n\n`;
    message += `*Cliente:* ${customerName}\n`;
    message += `*Telefone:* ${customerPhone}`;

    const whatsappUrl = `https://wa.me/${myPhoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");

    if (nameRef.current) nameRef.current.value = "";
    if (phoneRef.current) phoneRef.current.value = "";

    alert("Pedido finalizado! Você será redirecionado para o WhatsApp.");
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className={styles.cartPageContainer}>
      <div className={styles.headerSection}>
        <button onClick={handleGoBack} className={styles.backButton}>
          <IoArrowBack size={24} />
          <span>VOLTAR</span>
        </button>
        <h1>Meu Carrinho</h1>
      </div>
      {cart.length === 0 ? (
        <p>Seu carrinho está vazio.</p>
      ) : (
        <div className={styles.cartContent}>
          <div className={styles.cartItems}>
            {cart.map((item) => (
              <div key={item.id} className={styles.cartItem}>
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className={styles.itemImage}
                />
                <div className={styles.itemDetails}>
                  <h3>{item.name}</h3>
                  <p>R$ {item.price.toFixed(2).replace(".", ",")}</p>
                </div>
                <div className={styles.quantityControl}>
                  <button onClick={() => decreaseQuantity(item.id)}>
                    <FaMinus />
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => increaseQuantity(item.id)}>
                    <FaPlus />
                  </button>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className={styles.removeButton}
                >
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>
          <div className={styles.cartSummary}>
            <h2>Resumo do Pedido</h2>
            <p>
              Total:{" "}
              <span className={styles.cartTotal}>
                R$ {cartTotal.toFixed(2).replace(".", ",")}
              </span>
            </p>

            <form
              onSubmit={handleFinishPurchase}
              className={styles.customerForm}
            >
              <h3>Seus Dados</h3>
              <input
                type="text"
                placeholder="Seu Nome"
                ref={nameRef}
                required
              />
              <input
                type="tel"
                placeholder="Seu Telefone (Ex: 5581999999999)"
                ref={phoneRef}
                required
              />
              <button type="submit" className={styles.finishButton}>
                FINALIZAR COMPRA NO WHATSAPP
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
