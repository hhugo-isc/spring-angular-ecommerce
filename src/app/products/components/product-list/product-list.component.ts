import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../common/product';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  currentCategoryId!: number;
  searchMode: boolean = false;

  constructor(
    public productService: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => this.getProductList());
  }

  public getProductList(): void {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    this.products = [];
    if (this.searchMode) {
      this.handleSearchProducts();
    } else {
      this.handleListProducts();
    }
  }

  handleSearchProducts() {
    const keyword = this.route.snapshot.paramMap.get('keyword')!;
    this.productService
      .searchProducts(keyword)
      .subscribe((data) => (this.products = data));
  }

  handleListProducts() {
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if (hasCategoryId) {
      // get the "id" param string. convert string to a number using the "+"
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
    } else {
      this.currentCategoryId = 1;
    }

    // get the products for the given category id;
    this.productService
      .getProductList(this.currentCategoryId)
      .subscribe((products) => (this.products = products));
  }
}
