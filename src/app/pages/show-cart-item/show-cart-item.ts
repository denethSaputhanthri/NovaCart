import { Component, computed, inject, input } from '@angular/core';
import { CartItem } from '../../model/cart';
import { QtySelector } from '../../components/qty-selector/qty-selector';
import { EcommerceStore } from '../../ecommerce-store';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';

@Component({
  selector: 'app-show-cart-item',
  imports: [QtySelector, MatIcon, MatIconButton],
  template: `
    <div class="grid grid-cols-3 grid-cols-[3fr_1fr_1fr] p-2 ">
      <div class="flex items-center gap-20">
        <img [src]="item().product.imageUrl" class="w-24 h-24 rounded-lg object-cover" />
        <div>
          <div class="text-lg font-semibold text-gray-900">{{ item().product.name }}</div>
          <div class="text-sm text-gray-600">\${{ item().product.price }}</div>
        </div>
      </div>

      <app-qty-selector [quntity]="item().quantity" (qtyUpdated)="store.setQytItem({product : item().product, quantity: $event})" />

      <div class="flex flex-col items-center justify-center gap-3 justify-self-end">
        <div class="text-center text-lg font-semibold text-gray-900">\${{ total() }}</div>
        <div class="flex items-center gap-2">
          <button matIconButton class="action-button wish-button" (click)="store.moveToWishlist(item().product)">
            <mat-icon>favorite_border</mat-icon>
          </button>
          <button matIconButton class="danger" (click)="store.removeFromCart(item().product)">
            <mat-icon>delete</mat-icon>
          </button>
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class ShowCartItem {
  item = input.required<CartItem>();
  store = inject(EcommerceStore);
  total = computed(() => (this.item().product.price * this.item().quantity).toFixed(2));
}
