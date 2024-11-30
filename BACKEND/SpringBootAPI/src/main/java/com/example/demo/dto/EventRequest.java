//package com.example.demo.dto;
//
//
//import com.example.demo.entities.User;
//import com.example.demo.entities.Role;
//
//import java.sql.Date;
//import java.time.LocalDate;
//
//import com.example.demo.entities.Category;
//import lombok.Getter;
//import lombok.Setter;
//import lombok.ToString;
//
//@Setter
//@Getter
//@ToString
//public class EventRequest {
//
//    private int eventId;
//    private String eventName;
//    private String description;
//    private Date date;
//    private double price;
//    private String address;
//    private String city;
//    private long pincode;
//    private int noOfSeats;
//    private int rid;
//   
//    private int userId;
//
//    private String userName;
//    private String password;
//    private String fname;
//    private String lname;
//    private LocalDate dob;
//    private String aadharNo;
//    private String email;
//    private String mobileNo;
//    
//   private int roleId;
//   
//   private String roleName;
//    
//   private int catId;
//   private String catName;
//    
// 
//    private User user; 
//    private Role role;
//    private Category category;
//}
package com.example.demo.dto;


import com.example.demo.entities.User; 
import com.example.demo.entities.Role;

import java.sql.Date;
import java.time.LocalDate;

import com.example.demo.entities.Booking;
import com.example.demo.entities.Category;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class EventRequest {

    private int eventId;
    private String eventName;
    private String description;
    private Date date;
    private double price;
    private String address;
    private String city;
    private Long pincode;
    private int noOfSeats;
    private int rid;
    private String status;
   
    private int userId;

    private String userName;
    private String password;
    private String fname;
    private String lname;
    private LocalDate dob;
    private Long aadharNo;
    private String email;
    private String mobileNo;
    
    private int roleId;
   
    private String roleName;
    
    private int catId;
    private String catName;
    
    private String bookingDate;
    private int bookingId;
    private int totalCost;
    
    private Booking booking;
    private User user; 
    private Role role;
    private Category category;
}

