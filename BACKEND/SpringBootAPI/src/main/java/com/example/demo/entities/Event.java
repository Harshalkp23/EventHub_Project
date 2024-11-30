package com.example.demo.entities;

import java.sql.Date;
import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import lombok.*;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Table(name = "event")

public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "event_id")
    private int eventId;

    @Column(name = "event_name")
    private String eventName;

    @Column(name = "description")
    private String description;

    
    @Column(name = "date")
    private Date date;

    @Column(name = "price")
    private double price;

    @Column(name = "address")
    private String address;

    @Column(name = "city")
    private String city;

    @Column(name = "pincode")
    private long pincode;

    @Column(name = "no_of_seats")
    private int noOfSeats;

//    @ManyToOne(fetch = FetchType.EAGER)
//    @JoinColumn(name = "userid") 
//    @JsonIgnore
//    private User user;
    @Column(name = "status")
    private String status;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "catid") 
    private Category category;

  
}
