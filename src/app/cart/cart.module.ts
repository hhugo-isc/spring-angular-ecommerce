import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartStatusComponent } from './components/cart-status/cart-status.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { RouterModule } from '@angular/router';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [CartStatusComponent, CartDetailsComponent, CheckoutComponent],
  exports: [CartStatusComponent],
  imports: [CommonModule, HttpClientModule, RouterModule, ReactiveFormsModule],
})
export class CartModule {}
