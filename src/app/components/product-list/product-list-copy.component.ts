import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductFilterComponent } from '../product-filter/product-filter.component';

@Component({
  selector: 'app-product-list-copy',
  standalone: true,
  imports: [CommonModule, RouterModule, ProductFilterComponent],
  templateUrl: './product-list-copy.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListCopyComponent implements OnInit {
  products: any[] = [];
  filteredProducts: any[] = [];
  categories = [
    { id: 1, name: 'Ropa', apiName: 'Clothes' },
    { id: 2, name: 'Electrónica', apiName: 'Electronics' },
    { id: 3, name: 'Muebles', apiName: 'Furniture' },
    { id: 4, name: 'Zapatos', apiName: 'Shoes' },
    { id: 5, name: 'Otros', apiName: 'Miscellaneous' }
  ];
  loading = true;
  error = false;
  searchTerm = '';
  selectedCategory: number | null = null;

  constructor(private productService: ProductService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  loadProducts(): void {
    this.loading = true;
    this.error = false;

    this.productService.getAllProducts().subscribe({
      next: (data) => {
        console.log('PRODUCTOS RECIBIDOS:', data);

        this.products = data
          .filter(product => 
            product.category && 
            this.categories.some(cat => cat.apiName === product.category.name)
          )
          .map(product => {
            const category = this.categories.find(cat => cat.apiName === product.category.name);
            return {
              ...product,
              category: {
                ...product.category,
                name: category ? category.name : product.category.name
              }
            };
          });

        this.filteredProducts = [...this.products];
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.error = true;
        this.loading = false;
        this.cdr.detectChanges();
        console.error('Error loading products:', err);
      }
    });
  }

  handleSearch(searchTerm: string): void {
    this.searchTerm = searchTerm;
    this.applyFilters();
  }

  handleCategoryFilter(categoryId: number | null): void {
    this.selectedCategory = categoryId;
    this.applyFilters();
  }

  applyFilters(): void {
    let result = [...this.products];

    if (this.selectedCategory) {
      const category = this.categories.find(c => c.id === this.selectedCategory);
      if (category) {
        result = result.filter(p => 
          this.normalizeText(p.category.name) === this.normalizeText(category.name)
        );
      }
    }

    if (this.searchTerm.trim()) {
      const normalizedTerms = this.normalizeSearchTerm(this.searchTerm);
      result = result.filter(product => {
        const normalizedTitle = this.normalizeText(product.title);
        return normalizedTerms.some(term => normalizedTitle.includes(term));
      });
    }

    this.filteredProducts = result;
  }

  clearFilters(): void {
    this.searchTerm = '';
    this.selectedCategory = null;
    this.filteredProducts = [...this.products];
  }

  getCategoryName(id: number): string {
    const category = this.categories.find(c => c.id === id);
    return category?.name || 'Desconocida';
  }

  countProductsByCategory(categoryId: number): number {
    const category = this.categories.find(c => c.id === categoryId);
    return category 
      ? this.products.filter(p => p.category.name === category.name).length 
      : 0;
  }/*  */

  private normalizeSearchTerm(term: string): string[] {
    const normalizedTerm = this.normalizeText(term);
    return [normalizedTerm];
  }

  private normalizeText(text: string): string {
    return text
      .toLowerCase()
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]/g, '');
  }
}
