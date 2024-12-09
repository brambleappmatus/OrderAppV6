import { Product } from '@/types/product';
import { CartItem, AddToCartData } from '@/types/cart';
import { StateCreator } from 'zustand';
import toast from 'react-hot-toast';
import { getRandomMessage, addToCartMessages, removeFromCartMessages } from '@/utils/toastMessages';
import { addToCart, fetchCartItems, updateCartItemQuantity, removeFromCart, clearCart as clearCartInDb } from '@/lib/cart';
import { cartManager } from '@/lib/cartManager';

export interface CartState {
  cart: CartItem[];
  isLoading: boolean;
  addToCart: (product: Product, quantity?: number) => Promise<void>;
  removeFromCart: (cartItemId: string) => Promise<void>;
  updateCartItemQuantity: (cartItemId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  refreshCart: () => Promise<void>;
}

export const cartReducer: StateCreator<CartState, [], [], CartState> = (set, get) => ({
  cart: [],
  isLoading: false,

  refreshCart: async () => {
    try {
      set({ isLoading: true });
      const cartItems = await fetchCartItems();
      set({ cart: cartItems, isLoading: false });
    } catch (error) {
      console.error('Error refreshing cart:', error);
      set({ isLoading: false, cart: [] });
      cartManager.clearCartId();
      toast.error('Failed to refresh cart');
    }
  },
  
  addToCart: async (product, quantity = 1) => {
    try {
      set({ isLoading: true });
      
      // Ensure we have a valid cart session
      await cartManager.validateCartSession();
      const cartId = await cartManager.initializeCart();

      const cartData: AddToCartData = {
        cart_id: cartId,
        product_id: product.id,
        product_name: product.name,
        quantity,
        price: product.price * quantity,
        charity_amount: product.price * 0.1 * quantity
      };

      await addToCart(cartData);
      await get().refreshCart();

      toast.success(
        `${getRandomMessage(addToCartMessages)} (+€${cartData.charity_amount.toFixed(2)} to shelter 💝)`,
        {
          duration: 3000,
          style: {
            background: 'var(--toast-bg)',
            color: 'var(--toast-color)',
            border: '1px solid #dcfce7',
          },
        }
      );
    } catch (error) {
      console.error('Error adding to cart:', error);
      set({ isLoading: false });
      cartManager.clearCartId();
      toast.error('Failed to add item to cart. Please try again.');
    }
  },

  removeFromCart: async (cartItemId) => {
    try {
      set({ isLoading: true });
      
      // Validate cart session before operation
      const isValid = await cartManager.validateCartSession();
      if (!isValid) {
        throw new Error('Invalid cart session');
      }

      await removeFromCart(cartItemId);
      await get().refreshCart();

      toast.error(
        `${getRandomMessage(removeFromCartMessages)}`,
        {
          duration: 3000,
          style: {
            background: 'var(--toast-bg)',
            color: 'var(--toast-color)',
            border: '1px solid #fee2e2',
          },
        }
      );
    } catch (error) {
      console.error('Error removing from cart:', error);
      set({ isLoading: false });
      cartManager.clearCartId();
      toast.error('Failed to remove item from cart');
    }
  },

  updateCartItemQuantity: async (cartItemId, quantity) => {
    try {
      set({ isLoading: true });
      
      // Validate cart session before operation
      const isValid = await cartManager.validateCartSession();
      if (!isValid) {
        throw new Error('Invalid cart session');
      }

      await updateCartItemQuantity(cartItemId, quantity);
      await get().refreshCart();
    } catch (error) {
      console.error('Error updating cart item quantity:', error);
      set({ isLoading: false });
      cartManager.clearCartId();
      toast.error('Failed to update quantity');
    }
  },

  clearCart: async () => {
    try {
      await clearCartInDb();
      cartManager.clearCartId();
      set({ cart: [] });
    } catch (error) {
      console.error('Error clearing cart:', error);
      cartManager.clearCartId();
      toast.error('Failed to clear cart');
    }
  },
});