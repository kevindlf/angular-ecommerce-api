import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CartService, CartItem } from '../services/cart.service';

@Component({
  selector: 'app-cart-management',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart-management.component.html',
})
export class CartManagementComponent implements OnInit {
  cartItems: CartItem[] = [];
  private cartService = inject(CartService);
  private router = inject(Router);

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
    });
  }

  removeItem(productId: string) {
    this.cartService.removeFromCart(productId);
  }

  clearCart() {
    this.cartService.clearCart();
  }

  getTotal(): number {
    return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  goBack() {
    this.router.navigate(['/account']);
  }

  buy() {
    this.router.navigate(['/purchase-simulation']);
  }
}
