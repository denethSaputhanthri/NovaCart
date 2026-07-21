import { Component, computed, inject, input, output } from '@angular/core';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { EcommerceStore } from '../../ecommerce-store';
import { Product } from '../../model/products';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-products-card',
  imports: [MatButton, MatIcon, RouterLink],
  template: `
    <div
      class=" relative bg-white cursor-pointer runded-xl shadow-lg overflow-hidden flex flex-col h-full transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-xl"
    >
      <img
        [src]="product().imageUrl"
        class="w-full h-[300px] object-cover rounded-t-xl"
        [routerLink]="['/product', product().id]"
        [style.viewTransitionName]="'product-image-' + product().id"
      />
      <ng-content />
      <div class="p-5 flex flex-col  flex-1" [routerLink]="['/product',(product().id)]">
        <h3 class="text-lg font-semibold text-gray-900 mb-2 leading-tight">{{ product().name }}</h3>
        <p class="text-sm text-gray-600 mb-4 leading-relaxed">{{ product().description }}</p>
        <div class="text-sm font-medium mb-4">
          {{ product().inStock ? 'In Stock' : 'Out of Stock' }}
        </div>

        <div class="flex items-center justify-between mt-auto">
          <span class="text-2xl font-bold text-gray-900">\${{ product().price }}</span>
          <!-- Add to Cart button with icon -->
          <button
            matButton="filled"
            class="flex items-center gap-2"
            (click)="store.addToCart(product())"
            [style.viewTransitionName]="'add-to-cart-' + product().id">
            Add to Cart
            <mat-icon>shopping_cart</mat-icon>
          </button>
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class ProductsCard {
  store = inject(EcommerceStore);
  product = input.required<Product>();
  addToCard = output<Product>();
}
