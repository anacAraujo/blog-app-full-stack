CREATE DATABASE  IF NOT EXISTS `blog` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `blog`;
-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: blog
-- ------------------------------------------------------
-- Server version	8.0.36

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
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (2,'Flowers','<p>Flowers, nature\'s delicate marvels, have fascinated humanity for ages. From their symbolic meanings in floriography to their ecological importance as pollinator attractants, flowers enrich our lives in myriad ways. They adorn special occasions, inspire art and literature, and provide solace in times of need. Beyond their beauty, flowers showcase nature\'s resilience and adaptability, thriving in diverse environments worldwide. With medicinal properties and a timeless allure, flowers remind us of the profound connection between humanity and the natural world.</p>','1713888099872_pexels-suzyhazelwood-1578105.jpg','2024-04-22 15:46:10',2,'design',NULL),(3,'Abstract Art','<p>Abstract art, a genre characterized by its departure from representational forms, offers a canvas for boundless creativity and interpretation. Through the interplay of form, color, line, and texture, abstract artists transcend the constraints of reality, inviting viewers into a realm of subjective experience and emotion.</p><p>Across cultures and languages, abstract art serves as a universal language of form and color, forging connections between individuals and communities. Its power lies in its ability to transcend boundaries, inviting us to explore the depths of human experience and perception.</p>','1713810144014pexels-anniroenkae-2832382.jpg','2024-04-22 19:09:08',3,'art',NULL),(4,'Renaissance Art','<p>Renaissance art represents a golden age of creativity and intellect, characterized by its celebration of the human spirit and the beauty of the natural world. Through their mastery of technique and profound insight into the human condition, Renaissance artists left an indelible mark on the history of art, leaving behind a legacy of beauty, innovation, and inspiration.</p>','pexels-emrecan-2079661.jpg','2024-04-22 19:28:17',3,'art',NULL),(5,'Street Food','<p>Street food is more than just a quick and convenient meal – it\'s a vibrant reflection of a culture\'s culinary heritage, creativity, and community spirit. Found in bustling markets, bustling street corners, and vibrant food stalls around the world, street food offers a sensory journey that tantalizes the taste buds and immerses diners in the local gastronomic scene.</p>','pexels-guiirossi-1755691.jpg','2024-04-22 19:51:11',3,'food',NULL),(11,'Post 11','<p>Street food is more than just a quick and convenient meal – it\'s a vibrant reflection of a culture\'s culinary heritage, creativity, and community spirit. Found in bustling markets, bustling street corners, and vibrant food stalls around the world, street food offers a sensory journey that tantalizes the taste buds and immerses diners in the local gastronomic scene.</p>','1713870583586pexels-hermaion-173499.jpg','2024-04-23 13:12:08',3,'food',NULL),(14,'Title post with Video','<p>Text post text post text post text post text post text post text post text post text post text post text post text post text post text post text post text post text post text post text post text post text post text post text post text post text post text post text post text post text post text post text post text post text post text post text post text post text post text post text post text post text post text post text post text post text post text post text post text post text post text post text post text post text post</p>','1713905406871_pexels-pixabay-356056.jpg','2024-04-23 21:50:07',2,'technology','1713905407243_3141211-uhd_3840_2160_25fps.mp4');
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (2,'test','test','$2a$10$ASMcp9ZTXpFfKz1WQAvH5.N795m3.0lUr9yJigB.4Be5Pg9wVTvWW',NULL),(3,'qwe','qwe','$2a$10$jDCjeZRVIe5tfAx3zp2EguTxcohMvooIfS66T5LGa/0TAGYxuznkS',NULL),(4,'user','user@user.pt','$2a$10$QNweMYeAk9ql9UlqpMJ/QeGbc1mTlmBZIsiVM9dN179yUOautmAO6',NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-24 13:17:00
