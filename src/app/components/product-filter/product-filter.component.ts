import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-filter',
  standalone: true,  // <-- Esto indica que es standalone
  imports: [CommonModule, FormsModule, /* otros */],
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent {
  @Input() categories: any[] = [];
  @Output() searchEvent = new EventEmitter<string>();
  @Output() categoryFilterEvent = new EventEmitter<number | null>();
  
  searchTerm = '';
  selectedCategory: number | null = null;

  onSearch(): void {
    this.searchEvent.emit(this.searchTerm);
  }

  onCategoryChange(categoryId: number | null): void {
    this.selectedCategory = categoryId;
    this.categoryFilterEvent.emit(categoryId);
  }
}