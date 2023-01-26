import { Component, OnInit } from '@angular/core';
import { CartItem } from '../../common/cart-item';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: [],
})
export class CartDetailsComponent implements OnInit {
  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  totalQuantity: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.listCartDetails();
  }

  listCartDetails() {
    // get a handle to the cart items
    this.cartItems = this.cartService.cartItems;

    // subscribe to the cart totalPrice
    // subscribe to the cart totalQuantity
    this.cartService.cartStatus.subscribe((cartStatus) => {
      this.totalPrice = cartStatus.totalPrice;
      this.totalQuantity = cartStatus.totalQuantity;
      this.cartItems = this.cartService.cartItems;
    });

    // compute cart total price and quantity
    this.cartService.computeCartTotals();
  }

  incrementQuantity(cartItem: CartItem) {
    this.cartService.addToCart(cartItem);
  }

  decrementQuantity(cartItem: CartItem) {
    this.cartService.decrementQuantity(cartItem);
    console.log(cartItem);

    console.log(this.cartItems);
  }

  removeFromCart(item: CartItem) {
    this.cartService.removeItem(item);
  }
}
