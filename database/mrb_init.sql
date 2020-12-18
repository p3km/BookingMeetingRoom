-- MySQL dump 10.13  Distrib 8.0.21, for macos10.15 (x86_64)
--
-- Host: localhost    Database: meetingRoombooking
-- ------------------------------------------------------
-- Server version	8.0.21

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Create "MeetingRoomBooking" Database
--

DROP DATABASE IF EXISTS MeetingRoomBooking;
CREATE DATABASE MeetingRoomBooking;

--
-- Use "MeetingRoomBooking" Database
-- 

USE MeetingRoomBooking;

--
-- Table structure for table `Bookings`
--

DROP TABLE IF EXISTS `Bookings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Bookings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `organizerID` int NOT NULL,
  `repeatID` int DEFAULT NULL,
  `roomID` int NOT NULL,
  `year` int NOT NULL,
  `month` int NOT NULL,
  `day` int NOT NULL,
  `timeStart` int NOT NULL,
  `timeEnd` int NOT NULL,
  `reason` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_organizer` (`organizerID`),
  KEY `fk_room` (`roomID`),
  KEY `fk_repeat` (`repeatID`),
  CONSTRAINT `fk_organizer` FOREIGN KEY (`organizerID`) REFERENCES `Organizers` (`organizerID`),
  CONSTRAINT `fk_repeat` FOREIGN KEY (`repeatID`) REFERENCES `Repeats` (`repeatID`) ON DELETE SET NULL,
  CONSTRAINT `fk_room` FOREIGN KEY (`roomID`) REFERENCES `Rooms` (`roomID`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Organizers`
--

DROP TABLE IF EXISTS `Organizers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Organizers` (
  `organizerID` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`organizerID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Organizers`
--

LOCK TABLES `Organizers` WRITE;
/*!40000 ALTER TABLE `Organizers` DISABLE KEYS */;
INSERT INTO `Organizers` VALUES (1,'Adrian Evlogiev'),(2,'Alexander Marinov'),(3,'Denitsa Dimcheva');
/*!40000 ALTER TABLE `Organizers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `repeats`
--

DROP TABLE IF EXISTS `repeats`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `repeats` (
  `id` int DEFAULT NULL,
  `repeatID` int NOT NULL AUTO_INCREMENT,
  `repeatCycle` int NOT NULL,
  `repeatDays` int NOT NULL,
  `endYear` int DEFAULT NULL,
  `endMonth` int DEFAULT NULL,
  `endDay` int DEFAULT NULL,
  PRIMARY KEY (`repeatID`),
  KEY `fk_id` (`id`),
  CONSTRAINT `repeats_ibfk_1` FOREIGN KEY (`id`) REFERENCES `bookings` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Rooms`
--

DROP TABLE IF EXISTS `Rooms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Rooms` (
  `roomID` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`roomID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Rooms`
--

LOCK TABLES `Rooms` WRITE;
/*!40000 ALTER TABLE `Rooms` DISABLE KEYS */;
INSERT INTO `Rooms` VALUES (1,'Floor 1 Big Meeting Room'),(2,'Floor 1 Small Meeting Room'),(3,'Floor 3 Small Meeting Room'),(4,'Floor 3 Big Meeting Room');
/*!40000 ALTER TABLE `Rooms` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-07-27 16:44:26
