import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartDetailsComponent } from './cart/components/cart-details/cart-details.component';
import { CheckoutComponent } from './cart/components/checkout/checkout.component';
import { ProductDetailComponent } from './products/components/product-detail/product-detail.component';
import { ProductListComponent } from './products/components/product-list/product-list.component';

const routes: Routes = [
  {
    path: 'checkout',
    component: CheckoutComponent,
  },
  {
    path: 'cart-details',
    component: CartDetailsComponent,
  },
  {
    path: 'products/:id',
    component: ProductDetailComponent,
  },
  {
    path: 'search/:keyword',
    component: ProductListComponent,
  },
  {
    path: 'category/:id',
    component: ProductListComponent,
  },
  {
    path: 'category',
    component: ProductListComponent,
  },
  {
    path: 'products',
    component: ProductListComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/products',
  },
  {
    path: '**',
    redirectTo: '/products',
    pathMatch: 'full',
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRouter {}
