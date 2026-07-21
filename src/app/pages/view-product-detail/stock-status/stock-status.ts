import { Component, input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-stock-status',
  imports: [MatIcon],
  template: `
    @if (inStock()) {
      <div class="flex w-full items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-3">
        <mat-icon class="small text-green-600">check_circle</mat-icon>
        <span class="text-xs text-gray-800">In stock and ready to ship</span>
      </div>
    } @else {
      <div class="flex w-full items-center gap-2 rounded-lg border border-red-700 bg-white px-3 py-3">
        <mat-icon class="small red-700" >warning</mat-icon>
        <span class="text-xs text-red-700">
          This item is currently out of stock. Add it to your wishlist to be notified when it's back.
        </span>
      </div>
    }
  `,
  styles: ` `,
  host : {
    class: 'block',
  },
})
export class StockStatus {
  inStock = input(false);

}
