'use client';

import { supabase } from './supabase';
import { CartSession } from '@/types/cart';

export class CartManager {
  private static instance: CartManager;
  private cartId: string | null = null;
  private lastValidationTime: number = 0;
  private validationInterval: number = 30000; // 30 seconds

  private constructor() {
    if (typeof window !== 'undefined') {
      this.cartId = localStorage.getItem('cartId');
    }
  }

  static getInstance(): CartManager {
    if (!CartManager.instance) {
      CartManager.instance = new CartManager();
    }
    return CartManager.instance;
  }

  async validateCartSession(): Promise<boolean> {
    // Skip validation if we've validated recently
    const now = Date.now();
    if (now - this.lastValidationTime < this.validationInterval) {
      return true;
    }

    if (!this.cartId) return false;

    try {
      const { data, error } = await supabase
        .from('carts')
        .select('*')
        .eq('id', this.cartId)
        .single();

      if (error || !data) {
        this.clearCartId();
        return false;
      }

      this.lastValidationTime = now;
      return true;
    } catch (error) {
      console.error('Error validating cart session:', error);
      this.clearCartId();
      return false;
    }
  }

  async initializeCart(): Promise<string> {
    try {
      // First validate existing cart if any
      const isValid = await this.validateCartSession();
      if (isValid && this.cartId) {
        return this.cartId;
      }

      // If not valid or no cart exists, create new one
      const { data, error } = await supabase
        .from('carts')
        .insert([{ is_guest: true }])
        .select()
        .single();

      if (error) throw error;
      if (!data) throw new Error('Failed to create cart');
      
      this.cartId = data.id;
      if (typeof window !== 'undefined') {
        localStorage.setItem('cartId', this.cartId);
      }

      return this.cartId;
    } catch (error) {
      console.error('Error initializing cart:', error);
      this.clearCartId();
      throw new Error('Failed to initialize cart');
    }
  }

  async updateCartTimestamp(): Promise<void> {
    if (!this.cartId) return;

    try {
      const { error } = await supabase
        .from('carts')
        .update({ updated_at: new Date().toISOString() })
        .eq('id', this.cartId);

      if (error) {
        await this.validateCartSession();
        throw error;
      }
    } catch (error) {
      console.error('Error updating cart timestamp:', error);
      this.clearCartId();
      throw error;
    }
  }

  getCartId(): string | null {
    return this.cartId;
  }

  clearCartId(): void {
    this.cartId = null;
    this.lastValidationTime = 0;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('cartId');
    }
  }
}

export const cartManager = CartManager.getInstance();