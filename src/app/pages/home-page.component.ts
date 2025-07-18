import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ProductListComponent } from '../components/product-list/product-list.component';
import { CarouselComponent } from '../components/carousel/carousel.component';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [ProductListComponent, CarouselComponent],
  template: `
    <app-carousel [images]="carouselImages"></app-carousel>
    <app-product-list></app-product-list>
  `
})
export class HomePageComponent implements OnInit {
  carouselImages: string[] = [];

  constructor(private productService: ProductService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadCarouselImages();
  }

  loadCarouselImages(): void {
    this.productService.getAllProducts().subscribe({
      next: (products) => {
        this.carouselImages = products
          .map(product => product.images?.[0])
          .filter((img): img is string => !!img);
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error loading carousel images:', err);
      }
    });
  }
}
