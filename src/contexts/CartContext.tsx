import { createContext, useState, useContext, useEffect } from "react";
import type { ReactNode } from "react";
import type { Product, CartItem, Order } from "../types/CartAndOrderTypes";

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  increaseQuantity: (productId: number) => void;
  decreaseQuantity: (productId: number) => void;
  clearCart: () => void;
  cartTotal: number;
  totalCartItems: number;
  orders: Order[];
  addOrder: (order: Order) => void;
  cancelOrder: (orderId: string, userMessage: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const savedCart = localStorage.getItem("jtshop_cart");
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error("Erro ao carregar carrinho do LocalStorage:", error);
      return [];
    }
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const savedOrders = localStorage.getItem("jtshop_orders");
      return savedOrders ? JSON.parse(savedOrders) : [];
    } catch (error) {
      console.error("Erro ao carregar pedidos do LocalStorage:", error);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("jtshop_cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("jtshop_orders", JSON.stringify(orders));
  }, [orders]);

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [
          ...prevCart,
          {
            ...product,
            imageUrl: product.imageUrl,
            category: product.category,
            quantity: 1,
          },
        ];
      }
    });
  };

  const removeFromCart = (productId: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const increaseQuantity = (productId: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (productId: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId
          ? { ...item, quantity: Math.max(1, item.quantity - 1) }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const addOrder = (newOrder: Order) => {
    setOrders((prevOrders) => [...prevOrders, newOrder]);
  };

  const cancelOrder = (orderId: string, userMessage: string) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) => {
        if (order.id === orderId) {
          const myPhoneNumber = "5581997389529"; // Seu número de WhatsApp

          let message = `Olá! Gostaria de solicitar o cancelamento do meu pedido, ID: *${orderId.substring(
            0,
            8
          )}*.\n\n`;
          message += `Item(s) que desejo cancelar:\n`;
          order.items.forEach((item) => {
            message += `•  *${item.name}* (x${item.quantity})\n`; // Usando • como bullet
          });
          message += `\nAguardo a confirmação do cancelamento. Obrigado(a)!\n`;

          if (userMessage) {
            // Adiciona a mensagem do usuário se ela existir
            message += `\n*Mensagem do Cliente:* _${userMessage}_\n`;
          }

          const whatsappUrl = `https://wa.me/${myPhoneNumber}?text=${encodeURIComponent(
            message
          )}`;
          window.open(whatsappUrl, "_blank");

          return { ...order, status: "canceled" };
        }
        return order;
      })
    );
  };

  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const totalCartItems = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        cartTotal,
        totalCartItems,
        orders,
        addOrder,
        cancelOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
