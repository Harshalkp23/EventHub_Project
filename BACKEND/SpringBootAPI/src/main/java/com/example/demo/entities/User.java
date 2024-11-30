package com.example.demo.entities;

import java.sql.Date;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Table(name = "user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private int userId;

    @Column(name = "user_name", nullable = false)
    private String userName;

    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "fname")
    private String fname;

    @Column(name = "lname")
    private String lname;
    

    @Column(name = "dob")
    private LocalDate dob;

    @Column(name = "aadhar_no", nullable = false)
    private long aadharNo;

    @Column(name = "email", nullable = false)
    private String email;

    @Column(name = "pincode", nullable = false)
    private long pincode;

    @Column(name = "address")
    private String address;

    @Column(name = "mobile_no")
    private String mobileNo;
    
    @Column(name = "status")
    private String status;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "rid")
    private Role role;

//    @JsonIgnore
//    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
//    private List<Event> events = new ArrayList<>();
}
