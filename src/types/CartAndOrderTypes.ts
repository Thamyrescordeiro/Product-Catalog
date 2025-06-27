export interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string; 
  category: string;
  description: string; 
}

export interface CartItem extends Product {
  quantity: number;
}

export interface OrderItem extends Product { // Correção: OrderItem agora estende Product
  quantity: number;
}

export interface Order {
  id: string;
  date: string;
  total: number;
  items: OrderItem[];
  status: 'completed' | 'canceled';
}