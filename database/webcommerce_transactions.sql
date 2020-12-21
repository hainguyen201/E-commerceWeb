-- MySQL dump 10.13  Distrib 8.0.22, for Win64 (x86_64)
--
-- Host: localhost    Database: webcommerce
-- ------------------------------------------------------
-- Server version	8.0.22

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
-- Table structure for table `transactions`
--

DROP TABLE IF EXISTS `transactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transactions` (
  `TransactionID` int NOT NULL AUTO_INCREMENT COMMENT 'Mã giao dịch',
  `UserID` int DEFAULT NULL COMMENT 'ID của user giao dịch',
  `TransactionStatus` int DEFAULT NULL COMMENT 'Trạng thái giao dịch do admin cập nhật: 1- đã giao hàng, 0 - đang giao hàng',
  `Payment` decimal(10,0) DEFAULT NULL COMMENT 'Tổng giá trị thanh toán',
  `PhoneReceiver` varchar(45) DEFAULT NULL,
  `Receiver` varchar(45) DEFAULT NULL,
  `DeliveryAddress` varchar(1000) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT 'Thông tin thanh toán cụ thể:địa điểm giao hàng',
  `Message` varchar(255) DEFAULT NULL COMMENT 'Tin nhắn cho người bán',
  `SessionID` varchar(36) DEFAULT NULL,
  `TransactionModifiedDate` date DEFAULT NULL,
  `TransactionCreatedDate` date DEFAULT NULL COMMENT 'Ngày tạo',
  PRIMARY KEY (`TransactionID`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transactions`
--

LOCK TABLES `transactions` WRITE;
/*!40000 ALTER TABLE `transactions` DISABLE KEYS */;
INSERT INTO `transactions` VALUES (3,1,0,3000000,'0903487255',NULL,'Tự Nhiên, Thường Tín, Hà Nội','Giao buổi chiều',NULL,NULL,NULL),(4,1,1,3000000,'0903487255',NULL,'Tự Nhiên, Thường Tín, Hà Nội','Giao buổi chiều',NULL,NULL,NULL),(5,0,1,3000000,NULL,NULL,'Tự Nhiên, Thường Tín, Hà Nội','Giao buổi chiều','193145d0-41f3-11eb-8244-3bbf5bb5d388',NULL,NULL),(9,1,0,4000000,NULL,NULL,'Tự Nhiên, Thường Tín, Hà Nội','Giao buổi chiều','0',NULL,'2020-12-20'),(10,1,0,4000000,NULL,NULL,'Tự Nhiên, Thường Tín, Hà Nội','Giao buổi chiều','0',NULL,'2020-12-20'),(11,1,0,0,'0903487256',NULL,'Tự Nhiên, Thường Tín, Hà Nội','Giao buổi chiều','0',NULL,'2020-12-20'),(12,1,0,12000000,'0903487256',NULL,'Tự Nhiên, Thường Tín, Hà Nội','Giao buổi chiều','0',NULL,'2020-12-20'),(13,0,1,9500000,'',NULL,'','0','0','2020-12-20','2020-12-20');
/*!40000 ALTER TABLE `transactions` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-12-20 21:43:36
