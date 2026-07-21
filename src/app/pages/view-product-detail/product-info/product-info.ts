import { Component, inject, input, signal } from '@angular/core';
import { Product } from '../../../model/products';
import { TitleCasePipe } from '@angular/common';
import { StockStatus } from '../stock-status/stock-status';
import { QtySelector } from '../../../components/qty-selector/qty-selector';
import { MatIcon } from '@angular/material/icon';
import { EcommerceStore } from '../../../ecommerce-store';
import { ToggelWishlistButton } from '../../../components/toggel-wishlist-button/toggel-wishlist-button';
import { MatButton, MatIconButton } from '@angular/material/button';

@Component({
  selector: 'app-product-info',
  imports: [TitleCasePipe, StockStatus, QtySelector, MatIcon, ToggelWishlistButton,MatIconButton,MatButton],
  template: `
    <div class="text-xs rounded-xl bg-gray-100 px-2 py-1 mb-2 w-fit">
      {{ product().category | titlecase }}
    </div>
    <h1 class="text-2xl font-extrabold mb-4">{{ product().name }}</h1>
    <p class="text-3xl font-extrabold mb-4">\${{ product().price }}</p>
    <app-stock-status class="mb-4" [inStock]="product().inStock" />
    <p class="font-semibold mb-2">Description</p>
    <p class="text-sm text-gray-600 border-b border-gray-200 pb-2">{{ product().description }}</p>
    <div class="flex items-center gap-2 mb-3 pt-4">
      <span class="font-semibold">Quantity:</span>
      <app-qty-selector [quntity]="quantity()" (qtyUpdated)="quantity.set($event)" />
    </div>
    <div class="flex gap-4 mb border-b border-gray-200 pb-4">
      <button
        matButton="filled"
        class="w 2/3 flex items-center gap-2"
        (click)="store.addToCart(product(), quantity())"
        [disabled]="!product().inStock"
      >
        <mat-icon>shopping_cart</mat-icon>
        {{ product().inStock ? 'Add to Cart' : 'Out of Stock' }}
      </button>
      <app-toggel-wishlist-button [product]="product()"/>
      <button matIconButton>
        <mat-icon>share</mat-icon>
      </button>

    </div>
  `,
  styles: ``,
})
export class ProductInfo {
  store = inject(EcommerceStore);
  product = input.required<Product>();
  quantity = signal(1);
}
