import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CartService, CartItem } from '../services/cart.service';
import { FormsModule } from '@angular/forms';
import { collection, query, where, getDocs, addDoc, serverTimestamp } from 'firebase/firestore';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../firebase/firebase';

@Component({
  selector: 'app-purchase-simulation',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './purchase-simulation.component.html',
})
export class PurchaseSimulationComponent implements OnInit {
  cartItems: CartItem[] = [];
  cardNumber: string = '';
  email: string = '';
  password: string = '';
  private cartService = inject(CartService);
  private router = inject(Router);
  private firestore = db;
  private auth = auth;

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
    });
  }

  getTotal(): number {
    return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  async confirmPurchase() {
    console.log('confirmPurchase called');
    if (!this.cardNumber || this.cardNumber.length < 12) {
      alert('Por favor, ingrese un número de tarjeta válido.');
      return;
    }
    if (!this.email || !this.validateEmail(this.email)) {
      alert('Por favor, ingrese un correo electrónico válido.');
      return;
    }
    if (!this.password || this.password.length < 6) {
      alert('Por favor, ingrese una contraseña válida.');
      return;
    }

    try {
      // Authenticate user with email and password
      const userCredential = await signInWithEmailAndPassword(this.auth, this.email, this.password);
      const user = userCredential.user;

      if (!user) {
        alert('Credenciales inválidas.');
        return;
      }

      // Save purchase under the user document
      const purchasesRef = collection(this.firestore, `users/${user.uid}/purchases`);
      await addDoc(purchasesRef, {
        items: this.cartItems,
        total: this.getTotal(),
        cardNumber: this.cardNumber,
        createdAt: serverTimestamp()
      });

      alert('Compra realizada con éxito.');
      this.cartService.clearCart();
      this.router.navigate(['/account']);
    } catch (error) {
      alert('Error al realizar la compra: ' + error);
    }
  }

  validateEmail(email: string): boolean {
    const re = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return re.test(email);
  }

  goBack() {
    this.router.navigate(['/cart-management']);
  }
}
