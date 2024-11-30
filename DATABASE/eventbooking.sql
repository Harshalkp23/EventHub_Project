-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: projectdb
-- ------------------------------------------------------
-- Server version	8.2.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `booking`
--

DROP TABLE IF EXISTS `booking`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `booking` (
  `booking_id` int NOT NULL AUTO_INCREMENT,
  `booking_date` varchar(255) DEFAULT NULL,
  `no_of_seats` int DEFAULT NULL,
  `price` double DEFAULT NULL,
  `total_cost` double DEFAULT NULL,
  `user_id` int NOT NULL,
  `event_id` int NOT NULL,
  PRIMARY KEY (`booking_id`),
  KEY `user_id_idx` (`user_id`),
  KEY `event_id_idx` (`event_id`),
  CONSTRAINT `booking_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `event_id` FOREIGN KEY (`event_id`) REFERENCES `event` (`event_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2351 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `booking`
--

LOCK TABLES `booking` WRITE;
/*!40000 ALTER TABLE `booking` DISABLE KEYS */;
INSERT INTO `booking` VALUES (2345,'2024-08-19',20,3243,64860,13,129),(2346,'2024-08-19',20,3243,64860,13,129),(2347,'2024-08-19',10,500,5000,13,139),(2348,'2024-08-19',10,200,2000,13,142),(2349,'2024-08-19',40,500,20000,13,143),(2350,'2024-08-19',30,2100,63000,13,144);
/*!40000 ALTER TABLE `booking` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `cat_id` int NOT NULL AUTO_INCREMENT,
  `cat_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`cat_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'Sports'),(2,'Comedy Show'),(3,'Concert');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `event`
--

DROP TABLE IF EXISTS `event`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `event` (
  `event_id` int NOT NULL AUTO_INCREMENT,
  `event_name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `price` double DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `pincode` bigint DEFAULT NULL,
  `no_of_seats` int DEFAULT NULL,
  `catid` int DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`event_id`),
  KEY `cat_id_idx` (`catid`),
  CONSTRAINT `cat_id` FOREIGN KEY (`catid`) REFERENCES `category` (`cat_id`)
) ENGINE=InnoDB AUTO_INCREMENT=145 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event`
--

LOCK TABLES `event` WRITE;
/*!40000 ALTER TABLE `event` DISABLE KEYS */;
INSERT INTO `event` VALUES (123,'Alan Walker Concert','An concert for music enthusiasts and professionals.','2024-09-15',199.99,'123 Tech Ave, Balewadi','Pune',411004,500,3,NULL),(124,'Martin Garrix','kahdjadnakdn','2024-08-22',1500,'At/Post,Kesnand Taluka-Haveli,Near Grampanchayat Office Kesnand,Pune-412207','PUNE',412207,500,3,NULL),(129,'Martin Garrixwdasdsad','sdsaas','2024-08-13',3243,'dsfsd','dsdds',32434,14,2,'APPROVED'),(137,'Arijit Singh','ugufs','2024-08-22',1499,'ajshkgad','Pune',414236,201,3,NULL),(138,'Akon','English Songs','2024-06-25',1000,'Deccan','Pune',412208,200,3,'APPROVED'),(139,'Swapnil Bandodkar','Marathi Music show','2024-08-23',500,'Sarasbaug','Pune',411003,190,3,'APPROVED'),(140,'KhoKho','Sports','2024-08-20',500,'Wagholi','Pune',412207,192,1,'APPROVED'),(141,'Arjit ','Music concert','2024-09-23',700,'Kothrud','Pune',425487,150,3,'APPROVED'),(142,'Diwali Pahat','A mesmerizing Diwali Pahat event by Rahul Deshpande and Mahesh Kale','2024-08-21',200,'Sarasbaug','Pune',411004,190,3,'APPROVED'),(143,'Music Show','Rahul ','2024-08-21',500,'Swargate','Pune',412207,160,3,'APPROVED'),(144,'Sunburn','The music concert where DJ\'s from over the world unite and perform their arts.Music types are pop,remix,etc.','2024-08-21',2100,'Kesnand Hills','Pune',412207,1470,3,'APPROVED');
/*!40000 ALTER TABLE `event` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `feedback`
--

DROP TABLE IF EXISTS `feedback`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `feedback` (
  `feedback_id` int NOT NULL AUTO_INCREMENT,
  `rating` int DEFAULT NULL,
  `comment` varchar(45) DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `event_id` int DEFAULT NULL,
  PRIMARY KEY (`feedback_id`),
  KEY `feedback_event_id_idx` (`event_id`),
  KEY `feedback_user_id_idx` (`user_id`),
  CONSTRAINT `feedback_event_id` FOREIGN KEY (`event_id`) REFERENCES `event` (`event_id`),
  CONSTRAINT `feedback_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=402 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feedback`
--

LOCK TABLES `feedback` WRITE;
/*!40000 ALTER TABLE `feedback` DISABLE KEYS */;
/*!40000 ALTER TABLE `feedback` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payment`
--

DROP TABLE IF EXISTS `payment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payment` (
  `payment_id` int NOT NULL,
  `payment_date` datetime DEFAULT NULL,
  `amount` decimal(10,2) DEFAULT NULL,
  `payment_mode` varchar(45) DEFAULT NULL,
  `transaction_id` decimal(10,2) DEFAULT NULL,
  `status` varchar(45) DEFAULT NULL,
  `booking_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`payment_id`),
  UNIQUE KEY `transaction_id_UNIQUE` (`transaction_id`),
  KEY `payment_booking_id_idx` (`booking_id`),
  KEY `payment_user_id_idx` (`user_id`),
  CONSTRAINT `payment_booking_id` FOREIGN KEY (`booking_id`) REFERENCES `booking` (`booking_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `payment_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment`
--

LOCK TABLES `payment` WRITE;
/*!40000 ALTER TABLE `payment` DISABLE KEYS */;
/*!40000 ALTER TABLE `payment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `role_id` int NOT NULL,
  `role_name` varchar(255) NOT NULL,
  PRIMARY KEY (`role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (1,'admin'),(2,'organizer'),(3,'attendee');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `user_name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `fname` varchar(255) DEFAULT NULL,
  `lname` varchar(255) DEFAULT NULL,
  `dob` date DEFAULT NULL,
  `aadhar_no` bigint NOT NULL,
  `email` varchar(255) NOT NULL,
  `pincode` bigint NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `mobile_no` varchar(255) DEFAULT NULL,
  `rid` int NOT NULL,
  `status` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  KEY `rid_idx` (`rid`),
  CONSTRAINT `rid` FOREIGN KEY (`rid`) REFERENCES `role` (`role_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (12,'test','$2a$11$7CmzUB1t52dxQDiQuVf5D.BzR6YQ/lTmfamLY4itbenw.dYz4OwVu','test','test','1998-07-27',123456789098,'test@gmail.com',123456,'asdfg','1234567890',2,'APPROVED'),(13,'pratik','$2a$11$rs6xLR3QRwh.AOnrkvrP1O4nrGgavlzp9e8lgNTKrwpqgZU01MjMO','Pratik','Bhagat','2002-06-19',121111111111,'pratik@gmail.com',412089,'Pune','989328493',3,'APPROVED'),(14,'rohit','$2a$11$FedONkq5aOocg1YF44PatONaWgMMXZDvgMMatcM6e6M9SrV5Hc1ba','Rohit','Jadhav','1999-07-12',278347565,'rohit@gmail.com',1231234,'Deccan Pune','912313145',3,NULL),(15,'virat','$2a$11$pjJQkxPGmVHOLVoz4bMbme6mtP2aqviJOPHmCUJbOGvZUscQH1f9a','Virat','Shinde','2012-02-15',270987878733,'virat@gmail.com',412208,'Deccan','Pune',2,NULL),(16,'jayesh','$2a$11$aakZPyXp0XfupAzNwwLh.eqO.ZaCosooAY3uJmOW7w3NEkmr8qUue','Jayesh','Patil','1998-11-02',908765432149,'jayu23@gmail.com',435467,'Swargate Pune','9800543210',3,NULL),(17,'sanketpatil','$2a$11$0KVlOwKRyU/7VJX1a1ibUevdqNGksyXiPILzuFeeGX.f4w8STmCca','Sanket','Patil','2024-06-11',534655646556,'sanket3@gmail.com',546789,'Shivaji Nagar Pune','7895478901',3,NULL),(19,'admin','$2a$11$nR4FZbOxKAZORHyYDurWIe.md13/za8fmKlYAs5uP03bJT7ZSg20C','Devendra','K','1999-07-27',289989883812,'deva07@gmail.com',412207,'Deccan Pune','9890696409',1,'APPROVED'),(20,'shreyash','$2a$11$cwW4QwhZQ81vGHXjv23vgesQ4LhqA90aeQK7fHTTvfVfwmjuh33G2','Shreyash','Jadhav','2001-06-20',270909983261,'shreyash@gmail.com',412207,'Wagholi','9876456345',2,'APPROVED'),(21,'deep','$2a$11$52GEOATQKeUYbO29hh7HfeM7SaHGZL3AEP54WSoAEYLc5mFoRBgeW','Deep','Khadke','2000-06-06',270909983256,'deep@gmail.com',411004,'Sadashiv Peth ','8698319988',2,'APPROVED'),(22,'vivek','$2a$11$..f6aXsqnV8uCNfry389YubXEfBM5Xv49Iz6EPsezXYmDe9PAOm/S','Vivek','Patil','2001-06-05',270909983244,'vivek@gmail.com',412208,'Wagholi','9884367676',3,'APPROVED'),(23,'yash','$2a$11$9DwH60vGtaJeNZgfyG91JOj8kKgxGB99ivh.1Z8vwGK6WnvVk9UuS','Yash','Patil','2000-07-19',287787878877,'yash@gmail.com',412207,'Pimpri','8446888676',3,'APPROVED'),(24,'ganesh','$2a$11$kamSvgsqcbK.gVP1EDYh0uoShXUBn4S9g2CQJi6EHsM3JB96JxWN.','Ganesh','Kupkar','2000-07-20',270967645466,'ganesh@gmail.com',411004,'Pimpri','904999113',2,'APPROVED');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-08-19 16:22:56
