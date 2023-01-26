import { Component, Input, OnInit } from '@angular/core';
import { CartItem } from 'src/app/cart/common/cart-item';
import { CartService } from 'src/app/cart/services/cart.service';
import { Product } from '../../common/product';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
})
export class ProductItemComponent implements OnInit {
  @Input('product') product!: Product;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {}

  addToCart() {
    const cartItem: CartItem = new CartItem(this.product);
    this.cartService.addToCart(cartItem);
  }
}
