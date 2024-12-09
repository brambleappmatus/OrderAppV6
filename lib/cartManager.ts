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
      return this.cartId !== null;
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
      if (!data?.id) throw new Error('Failed to create cart');
      
      this.cartId = data.id;
      if (typeof window !== 'undefined') {
        localStorage.setItem('cartId', data.id);
      }

      this.lastValidationTime = Date.now();
      return data.id;

    } catch (error) {
      console.error('Error initializing cart:', error);
      this.clearCartId();
      throw new Error('Failed to initialize cart');
    }
  }

  async getOrCreateCartId(): Promise<string> {
    if (this.cartId) {
      const isValid = await this.validateCartSession();
      if (isValid) return this.cartId;
    }
    return this.initializeCart();
  }

  async updateCartTimestamp(): Promise<void> {
    const cartId = await this.getOrCreateCartId();

    try {
      const { error } = await supabase
        .from('carts')
        .update({ updated_at: new Date().toISOString() })
        .eq('id', cartId);

      if (error) throw error;
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