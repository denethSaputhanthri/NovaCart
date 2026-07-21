import { Component, inject, input } from '@angular/core';
import { BackButton } from '../../components/back-button/back-button';
import { EcommerceStore } from '../../ecommerce-store';
import { ProductsCard } from '../../components/products-card/products-card';
import { MatIcon } from '@angular/material/icon';
import { MatButton, MatIconButton } from '@angular/material/button';
import { EmptyWishlist } from "./empty-wishlist/empty-wishlist";

@Component({
  selector: 'app-my-wishlist',
  imports: [BackButton, ProductsCard, MatIcon, MatButton, EmptyWishlist],
  template: `
    <div class="mx-auto max-w-[1200px] py-6 px-4">
      <app-back-button class="mb-6" navigateTo="/products/all">Continue Shopping</app-back-button>
      @if (store.wishlistCount() > 0) {
        <div class="flex flex justify-between items-center mb-6">
          <h1 class="text-2xl font-bold text-gray-900">My Wishlist</h1>
          <span class="text-lg font-semibold text-gray-700">{{ store.wishlistCount() }} items</span>
        </div>
        <div class="responsive-grid">
          @for (product of store.wishlist(); track product.id) {
            <app-products-card [product]="product">
              <button
                class="!absolute top-3 right-3 w-10 h-10 z-10 !bg-white border-0 rounded-lg  flex items-center justify-center shadow-md cursor-pointer trasition-all  duration-200 hover:scale-110 hover:shadow-lg"
                MatIconButton
                (click)="store.removeWishlist(product)"
              >
                <mat-icon>delete</mat-icon>
              </button>
            </app-products-card>
          }
        </div>
        <div class="mat-8 flex justify-center ">
          <button matButton="outlined" class="danger " (click)="store.clearWishlist()">
            Clear Wishlist
          </button>

        </div>
      } @else {
        <app-empty-wishlist />
      }
    </div>
  `,
  styles: ``,
})
export default class MyWishlist {
  store = inject(EcommerceStore);
}
