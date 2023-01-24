import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductService } from './services/product.service';

@NgModule({
  declarations: [ProductListComponent],
  imports: [CommonModule, HttpClientModule],
  exports: [ProductListComponent],
  providers: [ProductService],
})
export class ProductsModule {}
