import { Component, computed, inject } from '@angular/core';
import { ViewPanel } from "../../directives/view-panel";
import { EcommerceStore } from '../../ecommerce-store';

@Component({
  selector: 'app-summerize-order',
  imports: [ViewPanel],
  template: `
    <div appViewPanel >
      <h2 class="text-2xl font-bold mb-4">Order Summary</h2>
      <div class="space-y-3 text-lg pt-4 border-t border-gray-200">
        <div class="flex justify-between">
          <span>Subtotal</span>
          <span>\${{ subtotal() }}</span>
        </div>
        <div class="flex justify-between">
          <span>Tax (5%)</span>
          <span>\${{ tax() }}</span>
        </div>
        <div class="flex justify-between font-bold text-lg pt-4 border-t border-gray-500">
          <span>Total</span>
          <span>\${{ total() }}</span>
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class SummerizeOrder {
  store = inject(EcommerceStore);

  subtotal = computed(() => Math.round(this.store.cart().reduce((acc, item) => acc + item.product.price * item.quantity, 0) * 100) / 100);

  tax = computed(() => Math.round(this.subtotal() * 0.05 )); // Assuming a 5% tax rate

  total = computed(() => this.subtotal() + this.tax());
}
