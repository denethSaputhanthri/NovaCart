import { Component, inject, input } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { EcommerceStore } from '../../ecommerce-store';
import { Product } from '../../model/products';

@Component({
  selector: 'app-add-to-cart-button',
  imports: [MatButton, MatIcon],
  template: `
    <button
      matButton="filled"
      class="flex items-center gap-2"
      (click)="store.addToCart(product())"
      
    >
      Add to Cart
      <mat-icon>shopping_cart</mat-icon>
    </button>
  `,
  styles: ``,
})
export class AddToCartButton {
  store = inject(EcommerceStore);
  product = input.required<Product>();
}
