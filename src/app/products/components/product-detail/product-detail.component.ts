import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/cart/common/cart-item';
import { CartService } from 'src/app/cart/services/cart.service';
import { Product } from '../../common/product';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: [],
})
export class ProductDetailComponent implements OnInit {
  product!: Product;

  constructor(
    private route: ActivatedRoute,
    private cartService: CartService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => this.getProduct());
  }

  getProduct() {
    const productId: number = +this.route.snapshot.paramMap.get('id')!;

    this.productService
      .getProduct(productId)
      .subscribe((product) => (this.product = product));
  }

  addToCart() {
    this.cartService.addToCart(new CartItem(this.product));
  }
}
