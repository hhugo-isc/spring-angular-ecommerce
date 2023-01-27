package com.hh.ecommerce.service;

import java.util.Set;
import java.util.UUID;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hh.ecommerce.dao.CustomerRepository;
import com.hh.ecommerce.dto.Purchase;
import com.hh.ecommerce.dto.PurchaseResponse;
import com.hh.ecommerce.entity.Customer;
import com.hh.ecommerce.entity.Order;
import com.hh.ecommerce.entity.OrderItem;

@Service
public class CheckoutServiceImpl implements CheckoutService {

	private CustomerRepository customerRepository;

	@Autowired
	public CheckoutServiceImpl(CustomerRepository customerRepository) {
		this.customerRepository = customerRepository;
	}

	@Override
	@Transactional
	public PurchaseResponse placeholder(Purchase purchase) {

//		retrieve the order info from dto
		Order order = purchase.getOrder();

//		generate tracking number
		String generateTrackingNumber = generateOrderTrackingNumber();
		order.setOrderTrackingNumber(generateTrackingNumber);

//		populate the order with orderItems
		Set<OrderItem> orderItems = purchase.getOrderItems();
		orderItems.forEach(item -> order.add(item));

//		populate order with billingAddess and shippingAddress
		order.setShippingAddress(purchase.getShippingAddress());
		order.setBillinAddress(purchase.getBillingAddress());

//		populate customer with order
		Customer customer = purchase.getCustomer();
		customer.add(order);

//		save to the database
		customerRepository.save(customer);

//		return a response
		return new PurchaseResponse(generateTrackingNumber);

	}

	private String generateOrderTrackingNumber() {
//		Generate a random UUID number (UUID version-4)
//		For details see https://en.wikipedia.org/wikiUniversally_unique_identifier

		return UUID.randomUUID().toString();
	}

}
