import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCategoryMenuComponent } from './components/product-category-menu/product-category-menu.component';
import { RouterModule } from '@angular/router';
import { SearchComponent } from './components/search/search.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ProductCategoryMenuComponent, SearchComponent],
  exports: [ProductCategoryMenuComponent, SearchComponent],
  imports: [CommonModule, RouterModule, FormsModule],
})
export class SharedModule {}
