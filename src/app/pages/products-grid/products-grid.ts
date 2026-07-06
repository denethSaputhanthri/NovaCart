import { Component, computed, input, signal } from '@angular/core';
import { Product } from '../../models/products';
import { ProductsCard } from '../../components/products-card/products-card';
import { MatSidenavContainer, MatSidenavContent, MatSidenav } from '@angular/material/sidenav';
import { MatNavList, MatListItem, MatListItemTitle } from '@angular/material/list';
import { RouterLink } from '@angular/router';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-products-grid',
  imports: [
    ProductsCard,
    MatSidenavContainer,
    MatSidenavContent,
    MatSidenav,
    MatNavList,
    MatListItem,
    MatListItemTitle,
    RouterLink,
    TitleCasePipe
  ],
  template: `
    <mat-sidenav-container>
      <mat-sidenav mode="side" opened="true">
        <div class="p-6">
          <h2 class="text-lg text-gray-900 font-bold ">Categories</h2>
          <mat-nav-list>
            @for (cate of categories(); track cate) {
              <mat-list-item class="my-2 " [activated]="cate === category()" [routerLink]="['/products', cate]">
                <span matListItemTitle class="font-medium" [class]="cate === category() ? '!text-white': 'null'">{{ cate | titlecase }}</span>
              </mat-list-item>
            }
          </mat-nav-list>
        </div>
      </mat-sidenav>
      <mat-sidenav-content class="bg-gray-100 p-6 h-full">
        <h1 class="text-2xl font-bold  text-gray-900 mb-1">{{ category() |titlecase}}</h1>
        <p class="text-base text-gray-600 mb-6">{{ filteredProducts().length }} products found</p>
        <div class="responsive-grid">
          @for (product of filteredProducts(); track product.id) {
            <app-products-card [product]="product" (addToCard)="onAddToCart($event)" />
          }
        </div>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: ``,
})
export default class ProductsGrid {
  category = input<string>('all');

  products = signal<Product[]>([
    {
      id: 1,
      name: 'Wireless Bluetooth Headphones',
      description: 'High-quality over-ear headphones with noise cancellation.',
      price: 79.99,
      imageUrl: 'https://picsum.photos/300/300?random=1',
      rating: 4.7,
      reviewsCount: 245,
      inStock: true,
      category: 'Electronics',
    },
    {
      id: 2,
      name: 'Gaming Mechanical Keyboard',
      description: 'RGB backlit mechanical keyboard with blue switches.',
      price: 59.99,
      imageUrl: 'https://picsum.photos/300/300?random=2',
      rating: 4.6,
      reviewsCount: 189,
      inStock: true,
      category: 'Electronics',
    },
    {
      id: 3,
      name: 'Smart Fitness Watch',
      description: 'Track your heart rate, sleep, and daily activities.',
      price: 129.99,
      imageUrl: 'https://picsum.photos/300/300?random=3',
      rating: 4.8,
      reviewsCount: 321,
      inStock: false,
      category: 'accessories',
    },
    {
      id: 4,
      name: "Men's Casual Sneakers",
      description: 'Comfortable sneakers suitable for everyday wear.',
      price: 49.99,
      imageUrl: 'https://picsum.photos/300/300?random=4',
      rating: 4.4,
      reviewsCount: 156,
      inStock: true,
      category: 'Fashion',
    },
    {
      id: 5,
      name: "Women's Leather Handbag",
      description: 'Elegant handbag crafted from premium leather.',
      price: 89.99,
      imageUrl: 'https://picsum.photos/300/300?random=5',
      rating: 4.9,
      reviewsCount: 278,
      inStock: true,
      category: 'Fashion',
    },
    {
      id: 6,
      name: 'Portable Bluetooth Speaker',
      description: 'Waterproof speaker with powerful bass and long battery life.',
      price: 39.99,
      imageUrl: 'https://picsum.photos/300/300?random=6',
      rating: 4.5,
      reviewsCount: 210,
      inStock: true,
      category: 'Electronics',
    },
    {
      id: 7,
      name: 'Ergonomic Office Chair',
      description: 'Adjustable office chair with lumbar support.',
      price: 199.99,
      imageUrl: 'https://picsum.photos/300/300?random=7',
      rating: 4.6,
      reviewsCount: 142,
      inStock: false,
      category: 'Furniture',
    },
    {
      id: 8,
      name: 'Stainless Steel Water Bottle',
      description: 'Vacuum insulated bottle keeps drinks cold for 24 hours.',
      price: 24.99,
      imageUrl: 'https://picsum.photos/300/300?random=8',
      rating: 4.7,
      reviewsCount: 387,
      inStock: true,
      category: 'Home & Kitchen',
    },
    {
      id: 9,
      name: 'Professional DSLR Camera',
      description: '24MP DSLR camera with 18-55mm lens kit.',
      price: 799.99,
      imageUrl: 'https://picsum.photos/300/300?random=9',
      rating: 4.9,
      reviewsCount: 98,
      inStock: true,
      category: 'Electronics',
    },
    {
      id: 10,
      name: 'Classic Cotton T-Shirt',
      description: 'Soft and breathable cotton t-shirt for everyday comfort.',
      price: 19.99,
      imageUrl: 'https://picsum.photos/300/300?random=10',
      rating: 4.3,
      reviewsCount: 412,
      inStock: true,
      category: 'Clothing',
    },
  ]);

  filteredProducts = computed(() => {
    const category = this.category().toLowerCase();

    if (category === 'all') {
      return this.products();
    }

    return this.products().filter((p) => p.category.toLowerCase() === category);
  });

  // filteredProducts = computed(() => this.products().filter((p) => p.category === this.category().toLowerCase()),
  // );

  onAddToCart(product: Product) {
    console.log('Product added to cart:', product);
  }

  categories = signal<string[]>([
    'all',
    'Home & Kitchen',
    'electronics',
    'fashion',
    'furniture',
    'clothing',
    'accessories',
  ]);
}
