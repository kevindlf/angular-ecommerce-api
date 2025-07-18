import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductFilterComponent } from '../product-filter/product-filter.component';
import { CarouselComponent } from '../carousel/carousel.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterModule, ProductFilterComponent],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
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

      // Filtramos y mapeamos los productos
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
    
    if (!searchTerm.trim()) {
      this.applyFilters();
      return;
    }

    const normalizedTerm = this.normalizeSearchTerm(searchTerm);
    
    this.filteredProducts = this.products.filter(product => {
      const searchFields = [
        product.title,
        product.description,
        product.category.name
      ].join(' ');

      return this.normalizeText(searchFields).includes(normalizedTerm);
    });
  }

  handleCategoryFilter(categoryId: number | null): void {
    this.selectedCategory = categoryId;
    this.applyFilters();
  }

  applyFilters(): void {
    let result = [...this.products];
    
    // Filtro por categoría
    if (this.selectedCategory) {
      const category = this.categories.find(c => c.id === this.selectedCategory);
      if (category) {
        result = result.filter(p => p.category.name === category.name);
      }
    }
    
    // Filtro por búsqueda
    if (this.searchTerm.trim()) {
      const normalizedTerm = this.normalizeSearchTerm(this.searchTerm);
      result = result.filter(product => {
        const searchFields = [
          product.title,
          product.description,
          product.category.name
        ].join(' ');
        return this.normalizeText(searchFields).includes(normalizedTerm);
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
  }

  // --- Helper Functions ---
  private normalizeSearchTerm(term: string): string {
    const dictionary: {[key: string]: string[]} = {
      'ropa': ['clothes', 'clothing', 'apparel'],
      'electronica': ['electronics', 'devices', 'tech'],
      'mueble': ['furniture', 'furnishing'],
      'zapato': ['shoes', 'footwear', 'sneakers'],
      'auricular': ['headphones', 'earphones'],
      'inalambrico': ['wireless', 'bluetooth'],
      'camiseta': ['shirt', 't-shirt'],
      'pantalon': ['pants', 'trousers'],
      'computador': ['computer', 'pc']
    };

    const normalizedTerm = this.normalizeText(term);
    let searchTerms = [normalizedTerm];

    Object.keys(dictionary).forEach(esTerm => {
      if (normalizedTerm.includes(esTerm)) {
        searchTerms = [...searchTerms, ...dictionary[esTerm]];
      }
    });

    return searchTerms.join('|');
  }

  private normalizeText(text: string): string {
    return text
      .toLowerCase()
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]/g, '');
  }
}
