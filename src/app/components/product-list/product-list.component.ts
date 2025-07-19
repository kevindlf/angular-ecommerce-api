import { Component, OnInit, ChangeDetectorRef, inject, Input } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CommonModule, DecimalPipe, SlicePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductFilterComponent } from '../product-filter/product-filter.component';
import { CarouselComponent } from '../carousel/carousel.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterModule, ProductFilterComponent, CarouselComponent, SlicePipe, DecimalPipe, FontAwesomeModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  @Input() images: string[] = [];

  private cartService = inject(CartService);
  private cdr: ChangeDetectorRef;

  constructor(cdr: ChangeDetectorRef) {
    this.cdr = cdr;
  }

  ngOnInit(): void {}

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  addToCart(product: any): void {
    console.log('Agregar al carrito:', product);
    const item = {
      productId: product.id,
      title: product.title,
      price: product.price,
      quantity: 1,
      image: product.images?.[0] || ''
    };
    this.cartService.addToCart(item);
  }
}
