import { Component, computed, inject, input } from '@angular/core';
import { MatIcon } from "@angular/material/icon";
import { EcommerceStore } from '../../ecommerce-store';
import { Product } from '../../model/products';


@Component({
  selector: 'app-toggel-wishlist-button',
  imports: [MatIcon],
  template: `
    <button
        class="w-10 h-10 rounded-full !bg-white border-0  flex items-center justify-center shadow-md cursor-pointer trasition-all  duration-200 hover:scale-110 hover:shadow-lg"
        [class]="isWishlisted() ? '!text-red-500' : '!text-black-400'"
        MatIconButton
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
