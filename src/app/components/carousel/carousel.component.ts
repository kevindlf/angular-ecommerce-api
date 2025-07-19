import { Component, Input, OnChanges, SimpleChanges, OnDestroy, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnChanges, OnInit, OnDestroy {
  @Input() images: string[] = [];
  currentIndex = 0;
  private autoSlideSubscription?: Subscription;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['images']) {
      console.log('Carousel images input:', this.images);
    }
  }

  ngOnInit(): void {
    console.log('Carousel ngOnInit called');
    this.startAutoSlide();
  }

  ngOnDestroy(): void {
    console.log('Carousel ngOnDestroy called');
    this.stopAutoSlide();
  }

  startAutoSlide(): void {
    console.log('Carousel startAutoSlide called');
    if (this.images.length <= 1) {
      console.log('Carousel auto-slide not started: not enough images');
      return;
    }
    this.autoSlideSubscription = interval(3000).subscribe(() => {
      console.log('Carousel auto sliding to next');
      this.nextSlide();
      this.cdr.markForCheck();
    });
  }

  stopAutoSlide(): void {
    console.log('Carousel stopAutoSlide called');
    if (this.autoSlideSubscription) {
      this.autoSlideSubscription.unsubscribe();
    }
  }

  selectSlide(index: number): void {
    this.currentIndex = index;
    console.log('Carousel selectSlide:', index);
    this.stopAutoSlide();
    this.startAutoSlide();
    this.cdr.markForCheck();
  }

  prevSlide(): void {
    this.currentIndex = (this.currentIndex === 0) ? this.images.length - 1 : this.currentIndex - 1;
    console.log('Carousel prevSlide:', this.currentIndex);
    this.stopAutoSlide();
    this.startAutoSlide();
    this.cdr.markForCheck();
  }

  nextSlide(): void {
    this.currentIndex = (this.currentIndex === this.images.length - 1) ? 0 : this.currentIndex + 1;
    console.log('Carousel nextSlide:', this.currentIndex);
    this.stopAutoSlide();
    this.startAutoSlide();
    this.cdr.markForCheck();
  }
}
