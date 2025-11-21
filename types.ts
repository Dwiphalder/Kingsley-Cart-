export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  image?: string; // Base64 string for user uploaded images
  isError?: boolean;
}

export enum ViewState {
  HOME = 'HOME',
  SHOP = 'SHOP',
  STYLIST = 'STYLIST',
  CART = 'CART'
}
