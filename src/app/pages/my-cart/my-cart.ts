import { Component, inject } from '@angular/core';
import { BackButton } from "../../components/back-button/back-button";
import { EcommerceStore } from '../../ecommerce-store';
import { MatIcon } from "@angular/material/icon";
import { ProductsCard } from "../../components/products-card/products-card";
import { ListCartItems } from "./list-cart-items/list-cart-items";
import { TeaseWishlist } from "./tease-wishlist/tease-wishlist";
import { SummerizeOrder } from "../../components/summerize-order/summerize-order";

@Component({
  selector: 'app-my-cart',
  imports: [BackButton, ListCartItems, TeaseWishlist, SummerizeOrder],
  template: `
    <div class="mx-auto max-w-[1200px] py-6 px-4">
      <app-back-button class="mb-6" navigateTo="/products/all" >Continue Shopping</app-back-button>
      @if (store.cartCount() > 0) {
        <div class="flex flex justify-between items-center mb-6">
          <h1 class="text-3xl font-bold text-gray-900">My Cart</h1>
          <span class="text-lg font-semibold text-gray-700">{{ store.cartCount() }} items</span>
        </div>
      }

      <app-tease-wishlist class="mb-6 block"/>
      <div class="grid grid-cols-1  lg:grid-cols-3 gap-6"> 
        <div class="lg:col-span-2"> 
         <app-list-cart-items />
        </div>
        <div>
          <app-summerize-order />
        </div>
      </div>
    </div>
  `,
  styles: ``,
})  
export default class MyCart {
  store = inject(EcommerceStore);
}
