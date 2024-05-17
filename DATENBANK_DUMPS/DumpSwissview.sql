-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: swissview
-- ------------------------------------------------------
-- Server version	8.0.37

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
-- Table structure for table `canton`
--

DROP TABLE IF EXISTS `canton`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `canton` (
  `ID_Canton` varchar(2) NOT NULL,
  `name` varchar(25) NOT NULL,
  `population` int NOT NULL,
  `area` int NOT NULL,
  `join_year` int NOT NULL,
  `language` varchar(100) NOT NULL,
  `capital` varchar(50) NOT NULL,
  PRIMARY KEY (`ID_Canton`),
  UNIQUE KEY `ID_Canton` (`ID_Canton`,`name`),
  CONSTRAINT `canton_chk_1` CHECK ((`join_year` >= 1291))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `canton`
--

LOCK TABLES `canton` WRITE;
/*!40000 ALTER TABLE `canton` DISABLE KEYS */;
INSERT INTO `canton` VALUES ('AG','Aargau',711232,1403,1803,'Deutsch','Aarau'),('AI','Appenzell Innerhoden',16416,172,1513,'Deutsch','Appenzell'),('AR','Appenzell Ausserhoden',55759,242,1513,'Deutsch','Herisau'),('BE','Bern',1051437,5958,1353,'Deutsch, Französisch','Bern'),('BL','Basel-Land',294417,517,1501,'Deutsch','Liestal'),('BS','Basel-Stadt',196786,36,1501,'Deutsch','Basel'),('FR','Freiburg',334465,1672,1481,'Französisch, Deutsch','Freiburg'),('GE','Genf',514114,282,1815,'Französisch','Genf'),('GL','Glarus',41471,685,1352,'Deutsch','Glarus'),('GR','Graubünden',202538,7105,1803,'Deutsch, Rätroromanisch, Italienisch','Chur'),('JU','Jura',73865,835,1979,'Französisch','Delsberg'),('LU','Luzern',424851,1493,1332,'Deutsch','Luzern'),('NE','Neuenburg',176571,802,1815,'Französisch','Neuenburg'),('NW','Nidwalden',44420,275,1291,'Deutsch','Stans'),('OW','Obwalden',38700,490,1291,'Deutsch','Sarnen'),('SG','St. Gallen',525967,2028,1803,'Deutsch','St. Gallen'),('SH','Schaffhausen',85214,298,1501,'Deutsch','Schaffhausen'),('SO','Solothurn',282408,790,1481,'Deutsch','Solothurn'),('SZ','Schwyz',164920,907,1291,'Deutsch','Schwyz'),('TG','Thurgau',289650,994,1803,'Deutsch','Frauenfeld'),('TI','Tessin',354023,2812,1803,'Italienisch','Bellinzona'),('UR','Uri',37317,1076,1291,'Deutsch','Altdorf'),('VD','Waadt',830431,3212,1803,'Französisch, Deutsch','Lausanne'),('VS','Wallis',357282,5224,1815,'Französisch, Deutsch','Sitten'),('ZG','Zug',131164,238,1352,'Deutsch','Zug'),('ZH','Zürich',1579967,1728,1351,'Deutsch','Zürich');
/*!40000 ALTER TABLE `canton` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment` (
  `ID_Comment` int NOT NULL AUTO_INCREMENT,
  `User_ID` int DEFAULT NULL,
  `Canton_ID` varchar(2) DEFAULT NULL,
  `Parent_ID` int DEFAULT NULL,
  `Content` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ID_Comment`),
  KEY `User_ID` (`User_ID`),
  KEY `Canton_ID` (`Canton_ID`),
  KEY `Parent_ID` (`Parent_ID`),
  CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`User_ID`) REFERENCES `user` (`ID_User`) ON DELETE SET NULL,
  CONSTRAINT `comment_ibfk_2` FOREIGN KEY (`Canton_ID`) REFERENCES `canton` (`ID_Canton`) ON DELETE CASCADE,
  CONSTRAINT `comment_ibfk_3` FOREIGN KEY (`Parent_ID`) REFERENCES `comment` (`ID_Comment`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `event`
--

DROP TABLE IF EXISTS `event`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `event` (
  `ID_Event` int NOT NULL AUTO_INCREMENT,
  `title` varchar(30) NOT NULL,
  `description` varchar(255) NOT NULL,
  `location` varchar(100) NOT NULL,
  `url` varchar(255) NOT NULL,
  `startTime` datetime NOT NULL,
  `endTime` datetime NOT NULL,
  `Canton_ID` varchar(2) DEFAULT NULL,
  PRIMARY KEY (`ID_Event`),
  KEY `Canton_ID` (`Canton_ID`),
  CONSTRAINT `event_ibfk_1` FOREIGN KEY (`Canton_ID`) REFERENCES `canton` (`ID_Canton`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event`
--

LOCK TABLES `event` WRITE;
/*!40000 ALTER TABLE `event` DISABLE KEYS */;
/*!40000 ALTER TABLE `event` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `feedback`
--

DROP TABLE IF EXISTS `feedback`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `feedback` (
  `ID_Feedback` int NOT NULL AUTO_INCREMENT,
  `User_ID` int DEFAULT NULL,
  `Canton_ID` varchar(2) NOT NULL,
  `Title` varchar(100) DEFAULT NULL,
  `Description` varchar(255) DEFAULT NULL,
  `Points` int NOT NULL,
  PRIMARY KEY (`ID_Feedback`),
  UNIQUE KEY `ID_Feedback` (`ID_Feedback`),
  KEY `User_ID` (`User_ID`),
  KEY `Canton_ID` (`Canton_ID`),
  CONSTRAINT `feedback_ibfk_1` FOREIGN KEY (`User_ID`) REFERENCES `user` (`ID_User`) ON DELETE SET NULL,
  CONSTRAINT `feedback_ibfk_2` FOREIGN KEY (`Canton_ID`) REFERENCES `canton` (`ID_Canton`) ON DELETE CASCADE,
  CONSTRAINT `feedback_chk_1` CHECK (((`Points` >= 0) and (`Points` <= 10)))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feedback`
--

LOCK TABLES `feedback` WRITE;
/*!40000 ALTER TABLE `feedback` DISABLE KEYS */;
/*!40000 ALTER TABLE `feedback` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `ID_User` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(30) DEFAULT NULL,
  `last_name` varchar(30) DEFAULT NULL,
  `username` varchar(32) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `Canton_ID` varchar(2) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `is_admin` tinyint(1) NOT NULL,
  PRIMARY KEY (`ID_User`),
  UNIQUE KEY `username` (`username`),
  KEY `Canton_ID` (`Canton_ID`),
  CONSTRAINT `user_ibfk_1` FOREIGN KEY (`Canton_ID`) REFERENCES `canton` (`ID_Canton`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'admin','admin','admin','$2a$10$/xGKIvYhmorEolpF2IAYzuLDvk7ipHq8tCgwSUJFxqKuy9MDtFoD2','BE','Bern',1);
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

-- Dump completed on 2024-05-17 14:37:02
