package com.hh.ecommerce.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hh.ecommerce.dto.Purchase;
import com.hh.ecommerce.dto.PurchaseResponse;
import com.hh.ecommerce.service.CheckoutService;

@RestController
@CrossOrigin("http://localhost:4200")
@RequestMapping("/api/checkout")
public class CheckoutController {

	private CheckoutService checkoutService;

	public CheckoutController(CheckoutService checkoutService) {
		this.checkoutService = checkoutService;
	}

	@PostMapping("/purchase")
	public PurchaseResponse placeholder(@RequestBody Purchase purchase) {
		PurchaseResponse purchaseResponse = checkoutService.placeholder(purchase);
		return purchaseResponse;
	}

}
