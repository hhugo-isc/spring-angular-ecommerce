import { Component, OnInit } from '@angular/core';
import { Product } from '../../common/product';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];

  constructor(public productService: ProductService) {}

  ngOnInit(): void {
    this.getProductList();
  }

  public getProductList(): void {
    this.productService
      .getProductList()
      .subscribe((products) => (this.products = products));
  }
}
