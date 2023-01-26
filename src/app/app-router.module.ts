import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailComponent } from './products/components/product-detail/product-detail.component';
import { ProductListComponent } from './products/components/product-list/product-list.component';

const routes: Routes = [
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
