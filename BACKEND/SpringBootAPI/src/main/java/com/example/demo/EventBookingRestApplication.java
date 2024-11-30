package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class EventBookingRestApplication {
	
	public static void main(String[] args) {
		SpringApplication.run(EventBookingRestApplication.class, args);

		System.out.println("Server started");
	}

}
