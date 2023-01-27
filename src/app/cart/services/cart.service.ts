import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { CartItem } from '../common/cart-item';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  _cartItems: CartItem[] = [];
  cartStatus: BehaviorSubject<CartStatus> = new BehaviorSubject<CartStatus>({
    totalPrice: 0.0,
    totalQuantity: 0,
  });

  constructor() {}

  get cartItems() {
    return [...this._cartItems];
  }

  addToCart(itemToAdd: CartItem) {
    // check if we already have the item in our cart
    // find the item index in the cart based on item id

    let itemInCartIndex: number = -1;
    if (this._cartItems.length > 0) {
      itemInCartIndex = this._cartItems.findIndex(
        (cartItem) => cartItem.id === itemToAdd.id
      );
    }

    // check if we found it
    if (itemInCartIndex !== -1) {
      this._cartItems[itemInCartIndex].quantity++;
    } else {
      this._cartItems.push(itemToAdd);
    }

    // compute cart total price and total quantity
    this.computeCartTotals();
  }

  computeCartTotals() {
    let totalPrice = 0;
    let totalQuantity = 0;
    this._cartItems.forEach((item) => {
      totalPrice += item.quantity * item.unitPrice;
      totalQuantity += item.quantity;
    });

    this.cartStatus.next({ totalPrice, totalQuantity });
  }

  decrementQuantity(cartItem: CartItem) {
    cartItem.quantity--;
    if (cartItem.quantity === 0) {
      this.removeItem(cartItem);
    } else {
      this.computeCartTotals();
    }
  }

  removeItem(itemToRemove: CartItem) {
    let cartIndex = this._cartItems.findIndex(
      (item) => item.id === itemToRemove.id
    );
    if (cartIndex !== -1) {
      this._cartItems.splice(cartIndex, 1);
      this.computeCartTotals();
    }
  }
}

interface CartStatus {
  totalPrice: number;
  totalQuantity: number;
}
