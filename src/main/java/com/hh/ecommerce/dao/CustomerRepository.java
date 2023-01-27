package com.hh.ecommerce.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hh.ecommerce.entity.Customer;

public interface CustomerRepository extends JpaRepository<Customer, Long> {

}
