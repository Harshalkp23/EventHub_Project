package com.example.demo.repository;

import com.example.demo.entities.Booking;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface BookingRepository extends JpaRepository<Booking, Integer> {

	//List<Booking> findByUser_Id(int userId);
	
	@Query("SELECT b FROM Booking b WHERE b.user.id = :userId")
    List<Booking> findBookingsByUserId(@Param("userId") int userId);
}
