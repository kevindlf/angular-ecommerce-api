import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

export interface CartItem {
  productId: string;
  title: string;
  price: number;
  quantity: number;
  image?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    if (this.isBrowser) {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        this.cartItemsSubject.next(JSON.parse(savedCart));
      }
    }
  }

  private updateLocalStorage(items: CartItem[]) {
    if (this.isBrowser) {
      localStorage.setItem('cart', JSON.stringify(items));
    }
  }

  getCartItems(): CartItem[] {
    return this.cartItemsSubject.getValue();
  }

  addToCart(item: CartItem) {
    const items = this.getCartItems();
    const index = items.findIndex(i => i.productId === item.productId);
    if (index !== -1) {
      items[index].quantity += item.quantity;
    } else {
      items.push(item);
    }
    this.cartItemsSubject.next(items);
    this.updateLocalStorage(items);
  }

  removeFromCart(productId: string) {
    let items = this.getCartItems();
    items = items.filter(i => i.productId !== productId);
    this.cartItemsSubject.next(items);
    this.updateLocalStorage(items);
  }

  clearCart() {
    this.cartItemsSubject.next([]);
    if (this.isBrowser) {
      localStorage.removeItem('cart');
    }
  }
}
