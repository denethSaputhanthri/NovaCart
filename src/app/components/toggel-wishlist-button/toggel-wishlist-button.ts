import { Component, computed, inject, input } from '@angular/core';
import { MatIcon } from "@angular/material/icon";
import { EcommerceStore } from '../../ecommerce-store';
import { Product } from '../../model/products';
import { MatIconButton } from '@angular/material/button';


@Component({
  selector: 'app-toggel-wishlist-button',
  imports: [MatIcon,MatIconButton],
  template: `
    <button matIconButton
        [class]="isWishlisted() ? '!text-red-500' : '!text-black-400'"
       
        (click)="toggleWishlist(product())"
      >
        <mat-icon>{{ isWishlisted() ? 'favorite' : 'favorite_border' }}</mat-icon>
      </button>
  `,
  styles: ``,
})
export class ToggelWishlistButton {

  store = inject(EcommerceStore);

  product = input.required<Product>();

  isWishlisted = computed(() =>
    this.store.wishlist().find((p: Product) => p.id === this.product().id),
  );

  toggleWishlist(product: Product) {
    if (this.isWishlisted()) {
      this.store.removeWishlist(product);
    } else {
      this.store.addToWishlist(product);
    }
  }

}
