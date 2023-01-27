package com.hh.ecommerce.dto;

import java.util.Set;

import com.hh.ecommerce.entity.Address;
import com.hh.ecommerce.entity.Customer;
import com.hh.ecommerce.entity.Order;
import com.hh.ecommerce.entity.OrderItem;

import lombok.Data;

@Data
public class Purchase {

	private Customer customer;
	private Address shippingAddress;
	private Address billingAddress;
	private Order order;
	private Set<OrderItem> orderItems;

}
