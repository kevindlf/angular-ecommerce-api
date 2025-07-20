import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CartService, CartItem } from '../services/cart.service';
import { FormsModule } from '@angular/forms';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../../firebase/firebase';

@Component({
  selector: 'app-purchase-simulation',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './purchase-simulation.component.html',
  styleUrls: ['./purchase-simulation.component.css']
})
export class PurchaseSimulationComponent implements OnInit {
  cartItems: CartItem[] = [];
  cardNumber: string = '';
  email: string = '';
  cardholderName: string = '';
  cardType: string = 'Visa';
  expirationDate: string = '';
  expirationMonth: string = '';
  expirationYear: string = '';
  securityCode: string = '';
  dni: string = '';
  billingAddress: string = '';
  phone1: string = '';
  phone2: string = '';
  termsAccepted: boolean = false;

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

  validateEmail(email: string): boolean {
    const re = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return re.test(email);
  }

  isCardExpired(): boolean {
    const now = new Date();
    const currentMonth = now.getMonth() + 1;
    const currentYear = now.getFullYear() % 100;

    const expMonth = parseInt(this.expirationMonth, 10);
    const expYear = parseInt(this.expirationYear, 10);

    if (isNaN(expMonth) || isNaN(expYear)) return false;

    return expYear < currentYear || (expYear === currentYear && expMonth < currentMonth);
  }

  async confirmPurchase() {
    console.log('confirmPurchase called');

    if (!this.cardholderName) {
      alert('Por favor, ingrese el nombre del titular.');
      return;
    }
    if (!this.cardType) {
      alert('Por favor, seleccione el tipo de tarjeta.');
      return;
    }
    if (!this.cardNumber || !/^\d{13,16}$/.test(this.cardNumber)) {
      alert('Por favor, ingrese un número de tarjeta válido de 13 a 16 dígitos.');
      return;
    }
    if (!this.expirationMonth || !/^(0[1-9]|1[0-2])$/.test(this.expirationMonth)) {
      alert('Por favor, ingrese un mes de vencimiento válido (01-12).');
      return;
    }
    if (!this.expirationYear || !/^\d{2}$/.test(this.expirationYear)) {
      alert('Por favor, ingrese un año de vencimiento válido (dos dígitos).');
      return;
    }
    if (this.isCardExpired()) {
      alert('La tarjeta ingresada está vencida. Usá otra.');
      return;
    }
    if (!this.securityCode || this.securityCode.length < 3) {
      alert('Por favor, ingrese un código de seguridad válido.');
      return;
    }
    if (!this.dni) {
      alert('Por favor, ingrese el DNI.');
      return;
    }
    if (!this.email || !this.validateEmail(this.email)) {
      alert('Por favor, ingrese un correo electrónico válido.');
      return;
    }
    if (!this.phone1) {
      alert('Por favor, ingrese al menos un teléfono.');
      return;
    }
    if (!this.termsAccepted) {
      alert('Debe aceptar los términos y condiciones.');
      return;
    }

    try {
      const user = this.auth.currentUser;
      console.log('Saving purchase for user:', user?.uid);

      if (!user) {
        alert('Debe iniciar sesión para realizar la compra.');
        return;
      }

      const purchasesRef = collection(this.firestore, `users/${user.uid}/purchases`);
      await addDoc(purchasesRef, {
        items: this.cartItems.map(item => ({
          name: item.title,
          quantity: item.quantity,
          price: item.price
        })),
        total: this.getTotal(),
        cardholderName: this.cardholderName,
        cardType: this.cardType,
        expirationDate: `${this.expirationMonth}/${this.expirationYear}`,
        securityCode: this.securityCode,
        dni: this.dni,
        email: this.email,
        phone1: this.phone1,
        phone2: this.phone2,
        createdAt: serverTimestamp()
      });

      alert('Compra realizada con éxito.');
      this.cartService.clearCart();
      this.router.navigate(['/account']);
    } catch (error) {
      alert('Error al realizar la compra: ' + error);
    }
  }

  
  goBack() {
    this.router.navigate(['/cart-management']);
  }
}
