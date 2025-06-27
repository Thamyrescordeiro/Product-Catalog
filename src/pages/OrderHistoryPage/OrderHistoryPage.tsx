import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";
import type { Order } from "../../types/CartAndOrderTypes";
import styles from "./OrderHistoryPage.module.css";
import { IoArrowBack } from "react-icons/io5";

function OrderHistoryPage() {
  const { orders, cancelOrder } = useCart();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"completed" | "canceled">(
    "completed"
  );
  const [showCancelPrompt, setShowCancelPrompt] = useState(false);
  const [orderToCancelId, setOrderToCancelId] = useState<string | null>(null);
  const [cancelMessage, setCancelMessage] = useState("");

  const handleGoBack = () => {
    navigate(-1);
  };

  const openCancelPrompt = (orderId: string) => {
    setOrderToCancelId(orderId);
    setShowCancelPrompt(true);
  };

  const closeCancelPrompt = () => {
    setShowCancelPrompt(false);
    setOrderToCancelId(null);
    setCancelMessage("");
  };

  const handleConfirmCancel = () => {
    if (orderToCancelId) {
      cancelOrder(orderToCancelId, cancelMessage);
      closeCancelPrompt();
    }
  };

  const completedOrders = orders.filter(
    (order) => order.status === "completed"
  );
  const canceledOrders = orders.filter((order) => order.status === "canceled");

  return (
    <div className={styles.pageContainer}>
      <div className={styles.headerSection}>
        <button onClick={handleGoBack} className={styles.backButton}>
          <IoArrowBack size={24} />
          <span>VOLTAR</span>
        </button>
        <h1 className={styles.pageTitle}>Meus Pedidos</h1>
      </div>

      <div className={styles.tabsContainer}>
        <button
          className={`${styles.tabButton} ${
            activeTab === "completed" ? styles.activeTabCompleted : ""
          }`}
          onClick={() => setActiveTab("completed")}
        >
          Pedidos Realizados ({completedOrders.length})
        </button>
        <button
          className={`${styles.tabButton} ${
            activeTab === "canceled" ? styles.activeTabCanceled : ""
          }`}
          onClick={() => setActiveTab("canceled")}
        >
          Pedidos Cancelados ({canceledOrders.length})
        </button>
      </div>

      {activeTab === "completed" && (
        <div className={styles.tabContent}>
          {completedOrders.length === 0 ? (
            <p className={styles.emptyMessage}>
              Você ainda não fez nenhum pedido realizado.
            </p>
          ) : (
            <div className={styles.ordersList}>
              {completedOrders.map((order: Order) => (
                <div key={order.id} className={styles.orderCard}>
                  <div className={styles.orderHeader}>
                    <span className={styles.orderId}>
                      Pedido ID: {order.id.substring(0, 8)}
                    </span>
                    <span className={styles.orderDate}>{order.date}</span>
                  </div>
                  <div className={styles.orderItems}>
                    {order.items.map((item) => (
                      <div key={item.id} className={styles.orderItem}>
                        <span>
                          {item.name} (x{item.quantity})
                        </span>
                        <span>
                          R${" "}
                          {(item.price * item.quantity)
                            .toFixed(2)
                            .replace(".", ",")}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className={styles.orderFooter}>
                    <button
                      className={styles.cancelButton}
                      onClick={() => openCancelPrompt(order.id)}
                    >
                      Cancelar Pedido
                    </button>
                    <span className={styles.orderTotal}>
                      Total: R$ {order.total.toFixed(2).replace(".", ",")}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === "canceled" && (
        <div className={styles.tabContent}>
          {canceledOrders.length === 0 ? (
            <p className={styles.emptyMessage}>
              Você não tem pedidos cancelados.
            </p>
          ) : (
            <div className={styles.ordersList}>
              {canceledOrders.map((order: Order) => (
                <div
                  key={order.id}
                  className={`${styles.orderCard} ${styles.canceledCard}`}
                >
                  <div className={styles.orderHeader}>
                    <span className={styles.orderId}>
                      Pedido ID: {order.id.substring(0, 8)}
                    </span>
                    <span className={styles.orderDate}>{order.date}</span>
                  </div>
                  <div className={styles.orderItems}>
                    {order.items.map((item) => (
                      <div key={item.id} className={styles.orderItem}>
                        <span>
                          {item.name} (x{item.quantity})
                        </span>
                        <span>
                          R${" "}
                          {(item.price * item.quantity)
                            .toFixed(2)
                            .replace(".", ",")}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className={styles.orderFooter}>
                    <span className={styles.canceledStatus}>CANCELADO</span>
                    <span className={styles.orderTotal}>
                      Total: R$ {order.total.toFixed(2).replace(".", ",")}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {showCancelPrompt && (
        <div className={styles.cancelModalOverlay}>
          <div className={styles.cancelModalContent}>
            <h2>Confirmar Cancelamento</h2>
            <p>
              Por favor, digite uma breve mensagem sobre o motivo do
              cancelamento (opcional):
            </p>
            <textarea
              className={styles.cancelMessageInput}
              value={cancelMessage}
              onChange={(e) => setCancelMessage(e.target.value)}
              placeholder="Ex: Não preciso mais do produto."
              rows={4}
            ></textarea>
            <div className={styles.modalActions}>
              <button
                className={styles.confirmCancelButton}
                onClick={handleConfirmCancel}
              >
                Confirmar Cancelamento
              </button>
              <button
                className={styles.closeModalButton}
                onClick={closeCancelPrompt}
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default OrderHistoryPage;
