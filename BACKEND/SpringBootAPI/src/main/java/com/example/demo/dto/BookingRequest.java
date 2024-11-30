package com.example.demo.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class BookingRequest {
    private int eventId;
    private int userId;
    private String bookingDate;
    private int noOfSeats;
    private double price;
    private double totalCost;
    private int bookingId;
}
