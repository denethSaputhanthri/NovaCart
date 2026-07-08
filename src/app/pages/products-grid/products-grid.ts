import { Component, computed, inject, input, signal } from '@angular/core';
import { ProductsCard } from '../../components/products-card/products-card';
import { MatSidenavContainer, MatSidenavContent, MatSidenav } from '@angular/material/sidenav';
import { MatNavList, MatListItem, MatListItemTitle } from '@angular/material/list';
import { RouterLink } from '@angular/router';
import { TitleCasePipe } from '@angular/common';
import { EcommerceStore } from '../../ecommerce-store';
import { ToggelWishlistButton } from "../../components/toggel-wishlist-button/toggel-wishlist-button";

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
    TitleCasePipe,
    ToggelWishlistButton
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
        <p class="text-base text-gray-600 mb-6">{{ store.filteredProducts().length }} products found</p>
        <div class="responsive-grid">
          @for (product of store.filteredProducts(); track product.id) {
            <app-products-card [product]="product">
              <app-toggel-wishlist-button [product]="product" class="!absolute top-3 right-3" />
            </app-products-card>
          }
        </div>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: ``,
})
export default class ProductsGrid {
  category = input<string>('all');
  
  store = inject(EcommerceStore);

  categories = signal<string[]>([
    'all',
    'electronics',
    'Home & Kitchen',
    'fashion',
    'furniture',
    'clothing',
    'accessories',
  ]);
  
  constructor() {
    this.store.setCategory(this.category);

  }
}
