import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart-status',
  templateUrl: './cart-status.component.html',
  styleUrls: [],
})
export class CartStatusComponent implements OnInit {
  totalPrice: number = 0.0;
  totalQuantity: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.updateStatus();
  }
  updateStatus() {
    this.cartService.cartStatus.subscribe((cartStatus) => {
      this.totalPrice = cartStatus.totalPrice;
      this.totalQuantity = cartStatus.totalQuantity;
    });
  }
}
