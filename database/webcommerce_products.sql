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
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `ProductID` int NOT NULL AUTO_INCREMENT COMMENT 'Mã sản phẩm',
  `ProductName` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT 'Tên sản phẩm',
  `Price` decimal(10,0) DEFAULT NULL COMMENT 'G',
  `Content` varchar(1000) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT 'Nội dung sản phẩm\n',
  `Image` varchar(255) DEFAULT NULL COMMENT 'Ảnh sản phẩm',
  `ImageList` varchar(255) DEFAULT NULL COMMENT 'Danh sách ảnh',
  `CatalogID` int DEFAULT NULL COMMENT 'Mã danh mục',
  `Discount` int DEFAULT NULL COMMENT 'Giảm giá : từ 0->100',
  `Remain` int DEFAULT NULL COMMENT 'Số lượng sản phẩm còn lại',
  `ProductCreatedDate` date DEFAULT NULL,
  `ProductModifiedDate` date DEFAULT NULL,
  PRIMARY KEY (`ProductID`),
  KEY `fk_Product_1_idx` (`CatalogID`),
  CONSTRAINT `fk_Product_1` FOREIGN KEY (`CatalogID`) REFERENCES `catalogs` (`CatalogID`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'iphone 12',35990000,'Sử dụng công nghệ mạnh nhất trong thiết kế chip, 3 camere cho ra những tấm hình sắc nét  Ram lên tới 6GB cho cảm giác sử dụng mượt mà','1.jpg','',1,0,20,'2020-12-18','2020-12-18'),(2,'iphone 11',20000000,NULL,'2.jpg',NULL,1,0,30,NULL,NULL),(5,'ipad 4 ',15390000,NULL,'5.jpg',NULL,2,0,40,NULL,NULL),(7,'mi note 11',0,'','7.jpg','',1,20,25,'2020-12-09','2020-12-09'),(42,'mi note 10',12000000,'','42.jpg','',1,0,0,'2020-12-11','2020-12-11'),(43,'mi note 9',0,'','43.jpg','',1,0,0,'2020-12-11','2020-12-11'),(44,'mi note 8',0,'','44.jpg','',1,0,0,'2020-12-11','2020-12-11'),(45,'mi note 7',1000000,'','45.jpg','',1,0,0,'2020-12-11','2020-12-11'),(46,'mi note 6',1500000,'','46.jpg','',1,0,0,'2020-12-11','2020-12-11'),(47,'mi note 6',0,'','47.jpg','',1,0,0,'2020-12-11','2020-12-11'),(48,'mi note 6',10000000,'','48.jpg','',1,0,0,'2020-12-11','2020-12-11'),(49,'mi note 6',0,'','49.jpg','',1,0,0,'2020-12-11','2020-12-11'),(50,'mi note 6',0,'','50.jpg','',1,0,0,'2020-12-11','2020-12-11');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
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
