import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ProductListComponent } from '../components/product-list/product-list.component';
import { CarouselComponent } from '../components/carousel/carousel.component';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [ProductListComponent, CarouselComponent],
  template: `
    <app-product-list [images]="carouselImages"></app-product-list>
  `
})
export class HomePageComponent implements OnInit {
  carouselImages: string[] = [
    '/assets/carrousel/image1.png',
    '/assets/carrousel/image2.png',
    '/assets/carrousel/image3.png',
    '/assets/carrousel/image4.png',
    '/assets/carrousel/image5.png',
    '/assets/carrousel/image6.png',
    '/assets/carrousel/image8.png'
  ];

  constructor(private productService: ProductService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    // Commenting out dynamic loading to use static images
    // this.loadCarouselImages();
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
