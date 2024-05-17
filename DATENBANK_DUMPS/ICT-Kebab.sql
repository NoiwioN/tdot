-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: ict_kebab
-- ------------------------------------------------------
-- Server version	8.0.34

create database if not exists ict_kebab;

use ict_kebab;

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
-- Table structure for table `drinks`
--

DROP TABLE IF EXISTS `drinks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `drinks` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `groesse` float(3,2) DEFAULT NULL,
  `PREIS` float(5,2) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `drinks`
--

LOCK TABLES `drinks` WRITE;
/*!40000 ALTER TABLE `drinks` DISABLE KEYS */;
INSERT INTO `drinks` VALUES (1,'Cola',0.50,1.95),(2,'Ayran',0.33,1.45),(3,'Uludag',0.33,1.95),(4,'Cola Zero',0.50,1.95);
/*!40000 ALTER TABLE `drinks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `food`
--

DROP TABLE IF EXISTS `food`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `food` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `beschreibung` text,
  `PREIS` float(5,2) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `food`
--

LOCK TABLES `food` WRITE;
/*!40000 ALTER TABLE `food` DISABLE KEYS */;
INSERT INTO `food` VALUES (1,'Döner Kebab','Gegrilltes Fleisch mit Salat und Sauce in einem Brot',9.95),(2,'Döner Teller','Gegrilltes Fleisch mit Reis oder Pommes und Salat',12.45),(3,'Dürüm Kebab','Gegrilltes Fleisch mit Salat und Sauce in einem Wrap',11.95);
/*!40000 ALTER TABLE `food` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `food_id` int DEFAULT NULL,
  `drinks_id` int DEFAULT NULL,
  `sauce_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `food_id` (`food_id`),
  KEY `drinks_id` (`drinks_id`),
  KEY `sauce_id` (`sauce_id`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`food_id`) REFERENCES `food` (`id`),
  CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`drinks_id`) REFERENCES `drinks` (`id`),
  CONSTRAINT `orders_ibfk_3` FOREIGN KEY (`sauce_id`) REFERENCES `sauces` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=97 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,NULL,NULL,NULL),(2,NULL,NULL,NULL),(4,3,4,1),(5,1,1,1),(6,1,1,1),(7,1,1,1),(8,1,3,6),(9,3,2,1),(10,1,3,6),(11,2,3,3),(12,2,3,3),(13,2,3,3),(14,2,3,3),(15,2,3,3),(16,2,3,3),(17,2,3,3),(18,1,1,2),(19,1,1,2),(20,1,1,2),(21,1,1,2),(22,1,1,2),(23,1,1,2),(24,1,1,2),(25,1,1,2),(26,1,1,2),(27,1,1,2),(28,1,1,2),(29,1,1,2),(30,1,1,2),(31,1,1,2),(32,1,1,2),(33,1,1,2),(34,1,1,2),(35,1,1,2),(36,1,1,2),(37,1,1,2),(38,1,1,2),(39,1,1,2),(40,1,1,2),(41,1,1,2),(42,1,1,2),(43,1,1,2),(44,1,1,2),(45,1,1,2),(46,1,1,2),(47,1,1,2),(48,1,1,2),(49,1,1,2),(50,1,1,2),(51,1,1,2),(52,1,1,2),(53,1,1,2),(54,1,1,2),(55,1,1,2),(56,1,1,2),(57,1,1,2),(58,1,1,2),(59,1,1,2),(60,1,1,2),(61,1,1,2),(62,1,1,2),(63,1,1,2),(64,1,1,2),(65,1,1,2),(66,1,1,2),(67,1,1,2),(68,1,1,2),(69,1,1,2),(70,1,1,2),(71,1,1,2),(72,1,1,2),(73,1,1,2),(74,1,1,2),(75,1,1,2),(76,1,1,2),(77,1,1,2),(78,1,1,2),(79,1,1,2),(80,1,1,2),(81,1,1,2),(82,1,1,2),(83,1,1,2),(84,1,1,2),(85,1,1,2),(86,1,1,2),(87,1,1,2),(88,1,1,2),(89,1,1,2),(90,1,1,2),(91,2,1,2),(92,1,2,3),(93,1,4,6),(94,1,3,1),(95,2,3,3),(96,3,4,7);
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `review`
--

DROP TABLE IF EXISTS `review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `review` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `product_Id` int DEFAULT NULL,
  `product_type` enum('sauces','food','drinks') DEFAULT NULL,
  `stars` int DEFAULT NULL,
  `comment` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `product_Id` (`product_Id`),
  CONSTRAINT `review_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `review_ibfk_2` FOREIGN KEY (`product_Id`) REFERENCES `sauces` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `review_ibfk_3` FOREIGN KEY (`product_Id`) REFERENCES `food` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `review_ibfk_4` FOREIGN KEY (`product_Id`) REFERENCES `drinks` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `review`
--

LOCK TABLES `review` WRITE;
/*!40000 ALTER TABLE `review` DISABLE KEYS */;
INSERT INTO `review` VALUES (1,1,2,'food',4,'','2024-03-28 08:15:11');
/*!40000 ALTER TABLE `review` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sauces`
--

DROP TABLE IF EXISTS `sauces`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sauces` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `art` varchar(50) DEFAULT NULL,
  `preis` decimal(4,2) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sauces`
--

LOCK TABLES `sauces` WRITE;
/*!40000 ALTER TABLE `sauces` DISABLE KEYS */;
INSERT INTO `sauces` VALUES (1,'Knoblauchsaucee','Joghurtbasis',0.50),(2,'Samurai Sauce','Chilibasis',0.50),(3,'Coktail Sauce','Kräuterbasis',0.50),(6,'Knoblauch-Heizleitpaste','Knoblauch-/Joghurt-/Heizleitpastenbasiert',1.00),(7,'Cocktail Kühlflüssigkeit','Cocktail-/RGB-Saftbasiert',1.00);
/*!40000 ALTER TABLE `sauces` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=154 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'clemens klemens','$2a$10$l42Uaiimydga2fdiUx2yZenuFpVUR2oxkA2Lfco3pD3P.FCUfaLdq'),(2,'yannick12','$2a$10$50JcH.Rbe4kvfuzN/b3W3eBFaCz.3poLgWw2OVSBpuvcsluM9BqAy'),(10,'root','$2a$12$n00LqGvPxgqI0AM7eEjemu9pIDDvSZBg.Bw6AnYc18Dv7Zhj7w9Xm'),(100,'root','1234'),(102,'daniel','$2a$10$gMpIoyEFtI3T5B.LjtGhJ.PDjLnKvd1VlPsqtMg5jQMG7SjqQVjc6'),(103,'daniel2','$2a$10$Zm8cdEnHMvtlynHNMIs8Tuo4yBDhwT/uoo4ChdNXex2C34kpy8Soa'),(104,'daniel7','$2a$10$3HviMk5xAJSc.F5IbivzwuA3nae4YUlNZnQmiMNA4LtNpFORi0TFC'),(105,'daniel10','$2a$10$J5nsxzWZda.KLSuNYIZiqemgoI/yOEtJ9IOIm./mjIpCVqbKKq9jW'),(106,'yannick','$2a$10$gBjxY9W/323e5dY9pPpziOgUWUi8cTAyA.p5KEB5zXD0YYzzBQIL2'),(108,'emdub','$2a$10$rMnwHkBOCSd41i8N88DoqeYeImTx0MigKMJTW4RxW26mjmY0LsfoK'),(109,'ywo146355@stud.gibb.ch','$2a$10$t0T00GlRycYMSZyvnOdP9.8kdJOrKAegSajqccsuORXnFcDh8HvfK'),(110,'Huren Sohn','$2a$10$Co1m2OcHeTc.FUmPbaaKXe1eMR.tNXwU1ttgEH4.SNW2EkHsuVhvy'),(111,'asdasdd','$2a$10$KzIB1QYn2erXWjSjp11jAepMMObNXmQdmy9DA5DgIJnF/GsAYKqjC'),(112,'asd','$2a$10$y8A67Gg0pVAaSfKkHST/N.gaZ30GRfGiThiVdfwYiGP7G7V0KCOgS'),(114,'Username can\'t be empty','$2a$10$PmB3FYaglONtTHAZ5rNkuueIVf4MVkGFVSY8Iges6xgnqc1sBHKau'),(115,'yukis','$2a$10$5PeMsewacvY8DekOYn1X3eoEEptLri5d8FJTK.iAqkerlUCQ4bCUa'),(116,'erme','$2a$10$j1NzSvkKg4RyuHaESSb8E.izOLlTwiJ92VkID7XZJiMYIjRk7QSVO'),(117,'eeeee','$2a$10$vSXAOTM3hZ3SZCFdybY7XOkm35MQnPSC9DvWxPRW8oMeUJOA2HVK.'),(118,'ermre','$2a$10$Cn6i0vSpx1wVZXZnA2eQnexI6AZkNkQgLuFJ.uIh0vhFLbCJcSgxW'),(119,'sad','$2a$10$PyE31T9Axd/1K0uurxRgUuNRKlx/rN5b/I.hBpd8HVIe3S6bT0wMi'),(120,'emreer','$2a$10$rqK1nJFK7TaSe11m07aTKObNm7DewzN9iFDEE3Sb8w/Am.0magJR.'),(121,'sad','$2a$10$./qB/5/PJf1sGSc9rgc.pe7HgiNzcbyFue1oeFFYOUVP.K.ZgP50G'),(122,'Michitest','$2a$10$UWEaIu.OaR19zHwsedyjNOPWaZY/wxBXOZ.6EVf7yuBOCdThHp2jW'),(123,'erer','$2a$10$v3WrCs5cCnaYs7njAol06OIy18PB3Ruf50B7l20GzHvOaqCNgpbAy'),(124,'nussi','$2a$10$b3D6A10dxJNQ5zTkvmU6yOhyOTE9hSkCwgntjlrQrl3p/AxGXYgfC'),(126,'<script>alert(\'XSS\')</script>','$2a$10$vX5iyJxVJRXcKODiZ8fCi.ijZCTPFn3aCvX/nqKXX7oxiB0HPq1RC'),(127,'<script>alert(\'XSS\')</script>','$2a$10$sgjSd6SxG78VGLDRDt4h9O5j712FcXzgJR5nyXHRedB8CjPrnLrKy'),(128,'<script>alert(\'XSS\')</script>','$2a$10$SulT/lcO4UuhPDwmaKXaV.Y1ASYR.ns2xE.nzQQr6cUYOCy4TN42O'),(129,'sda','$2a$10$lB4sqwgrt4c9sTGhDu0gV.IJNYodlwXQxVHzXuOGPv3FFNC081J0y'),(130,'hallo; DROP ALL TABLES; --','$2a$10$bAsdZUhXtFHZakB3MEIeiuEgDQya3hyo.Hgt/jMMe1Bjk/UWWR.hm'),(132,'Rafi','$2a$10$OHdwBKhyTyqqtrb7Z32oOe9QBZxKyoXuXA8yCiulZOCXqxUGSNpqu'),(134,'danier','$2a$10$bo6/kjsWAJ5x1T4VdYHaFODY4nVEkFXIaCBTvQpR1C6dPk2hTA7Xa'),(141,'1234','$2a$10$YQ5M7NsJ8dPJnbneJkwJG.v41da5G.3xTiKrx7llYjwydV2oO8LVu'),(143,'yuki','$2a$10$6qPEnRBcaoGTlOvB.fS1/eAMT290SF9xXye3/thRsO/CBJdZdc05.'),(145,'Admin','$2a$10$BCQKJYl9/.sKWhyXnHi4M.bk4HBkeUWJdmwGiATdYz9fOmgK.jmQu'),(146,'Kayadmin','$2a$10$isBBL6H2ZXAd3DSlDiJL0uUCcDoRQahVOTLXO3HP1W2523rtICeZq'),(147,'user1','$2a$10$f0Kl6tRV8yaUhwVw.t3J2eoFK5GMmGxHWWJSokcxVpMalzhz7rYly'),(148,'fwefwefw','$2a$10$VvPddBO.XCC2V2ko0PBh/esg59wmRIsFLhH9F.N.CqefddsawMyH.'),(149,'wefwefw','$2a$10$xow/lZi7Hiu5Jy8NF/FSouFc2r5/oiJBTBXjtFnxrvP.HosAWlTJi'),(150,'dfasdfasd','$2a$10$xbA/kUGAgMba3Nczu9ZdC.FLQ6gQWKt03G5JGAaGQknsEoSYjXZ9G'),(151,'asdfasdfasdf','$2a$10$RnXrqbXHnX2bXMezXgnuE.iNCCcEAtyM3yopXJiqRC5G4Ps1778HK'),(152,'asdfasdfasd','$2a$10$GYxX05c7j.S44/QgmldRSu58L9KYHFVEVXsyxH4.VDv/5XRnxS7JO'),(153,'fortnite','$2a$10$zWS9SZYOpUrEawYi.k4h8.R.Y7FDB1amPd1f/D4Zd3blTtinimQz2');
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

-- Dump completed on 2024-04-11 16:45:54
