//package com.example.demo.repository;
//
//import java.util.List;
//
//import org.springframework.data.jpa.repository.JpaRepository;
//
//import com.example.demo.entities.Category;
//import com.example.demo.entities.Event;
//import com.example.demo.entities.User;
//
//public interface EventRepository extends JpaRepository<Event, Integer> {
//
//	
//
////	List<Event> findByUser(User user);
//
//	List<Event> findByCategory(Category category);
//
//	List<Event> findByCategory_CatName(String catName);
//
//	List<Event> findByCity(String city);
//
//	 List<Event> findByDate(String date);
//
//	List<Event> findByEventNameContaining(String eventName);
//
//	
//}
package com.example.demo.repository;

import java.sql.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.demo.entities.Category;
import com.example.demo.entities.Event;

public interface EventRepository extends JpaRepository<Event, Integer> {

  
    List<Event> findByCategoryAndStatus(Category category, String status);

    List<Event> findByCategory_CatNameAndStatus(String catName, String status);


    List<Event> findByCityAndStatus(String city, String status);


    @Query("SELECT e FROM Event e WHERE e.date > :today AND e.status = 'APPROVED'")
    List<Event> findUpcomingEvents(@Param("today") Date today);

    List<Event> findByEventNameContainingAndStatus(String eventName, String status);


    List<Event> findByStatus(String status);

 
    @Query("SELECT e FROM Event e WHERE e.city = :city AND e.date BETWEEN :startDate AND :endDate AND e.status = 'APPROVED'")
    List<Event> findEventsByCityAndDateRange(@Param("city") String city, @Param("startDate") Date startDate, @Param("endDate") Date endDate);
}

