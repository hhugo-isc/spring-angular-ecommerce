import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartStatusComponent } from './components/cart-status/cart-status.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [CartStatusComponent, CartDetailsComponent],
  exports: [CartStatusComponent],
  imports: [CommonModule, RouterModule],
})
export class CartModule {}
