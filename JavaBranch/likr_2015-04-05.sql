# ************************************************************
# Sequel Pro SQL dump
# Version 4135
#
# http://www.sequelpro.com/
# http://code.google.com/p/sequel-pro/
#
# Host: 127.0.0.1 (MySQL 5.6.20)
# Database: likr
# Generation Time: 2015-04-05 06:30:08 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table answers
# ------------------------------------------------------------

DROP TABLE IF EXISTS `answers`;

CREATE TABLE `answers` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `description` varchar(255) NOT NULL DEFAULT '',
  `questionId` int(11) NOT NULL,
  `type` varchar(10) NOT NULL DEFAULT 'IMAGE',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `answers` WRITE;
/*!40000 ALTER TABLE `answers` DISABLE KEYS */;

INSERT INTO `answers` (`id`, `description`, `questionId`, `type`)
VALUES
	(1,'a11.png',1,'IMAGE'),
	(2,'a12.png',1,'IMAGE'),
	(3,'a21.png',2,'IMAGE'),
	(4,'a22.png',2,'IMAGE'),
	(5,'a31.png',3,'IMAGE'),
	(6,'a32.png',3,'IMAGE'),
	(7,'a41.png',4,'IMAGE'),
	(8,'a42.png',4,'IMAGE'),
	(9,'a51.png',5,'IMAGE'),
	(10,'a52.png',5,'IMAGE'),
	(11,'a61.png',6,'IMAGE'),
	(12,'a62.png',6,'IMAGE'),
	(13,'a71.png',7,'IMAGE'),
	(14,'a72.png',7,'IMAGE'),
	(15,'a81.png',8,'IMAGE'),
	(16,'a82.png',8,'IMAGE'),
	(17,'a91.png',9,'IMAGE'),
	(18,'a92.png',9,'IMAGE'),
	(19,'a101.png',10,'IMAGE'),
	(20,'a102.png',10,'IMAGE');

/*!40000 ALTER TABLE `answers` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table game_user_answers
# ------------------------------------------------------------

DROP TABLE IF EXISTS `game_user_answers`;

CREATE TABLE `game_user_answers` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `gameId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `questionId` int(11) NOT NULL,
  `answerId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `game_user_answers` WRITE;
/*!40000 ALTER TABLE `game_user_answers` DISABLE KEYS */;

INSERT INTO `game_user_answers` (`id`, `gameId`, `userId`, `questionId`, `answerId`)
VALUES
	(1,3,9,1,2),
	(2,3,9,2,2),
	(3,3,9,4,2),
	(4,3,9,8,2),
	(5,3,9,10,2),
	(6,3,8,1,2),
	(7,3,8,2,1),
	(8,3,8,4,NULL),
	(9,3,8,8,NULL),
	(10,3,8,10,NULL);

/*!40000 ALTER TABLE `game_user_answers` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table game_users
# ------------------------------------------------------------

DROP TABLE IF EXISTS `game_users`;

CREATE TABLE `game_users` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `gameId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `game_users` WRITE;
/*!40000 ALTER TABLE `game_users` DISABLE KEYS */;

INSERT INTO `game_users` (`id`, `gameId`, `userId`)
VALUES
	(3,3,9),
	(4,3,8),
	(5,2,12),
	(6,2,13),
	(7,6,13),
	(8,1,13),
	(9,3,13),
	(10,7,7),
	(11,8,7),
	(12,8,15),
	(13,11,17),
	(14,11,18),
	(15,12,19),
	(16,13,19),
	(17,14,19),
	(18,14,20);

/*!40000 ALTER TABLE `game_users` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table games
# ------------------------------------------------------------

DROP TABLE IF EXISTS `games`;

CREATE TABLE `games` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL DEFAULT '',
  `state` varchar(10) NOT NULL DEFAULT 'CREATED',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `games` WRITE;
/*!40000 ALTER TABLE `games` DISABLE KEYS */;

INSERT INTO `games` (`id`, `name`, `state`)
VALUES
	(1,'1233','CREATED'),
	(2,'asdasd','CREATED'),
	(3,'test','STARTED'),
	(4,'my game','CREATED'),
	(5,'asdasd','CREATED'),
	(6,'UUUU','CREATED'),
	(7,'MEE','CREATED'),
	(8,'qqq','CREATED'),
	(9,'AAA','CREATED'),
	(10,'BBB','CREATED'),
	(11,'777','CREATED'),
	(12,'111','CREATED'),
	(13,'1112','CREATED'),
	(14,'1113','CREATED');

/*!40000 ALTER TABLE `games` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table questions
# ------------------------------------------------------------

DROP TABLE IF EXISTS `questions`;

CREATE TABLE `questions` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `questions` WRITE;
/*!40000 ALTER TABLE `questions` DISABLE KEYS */;

INSERT INTO `questions` (`id`, `title`)
VALUES
	(1,'q1'),
	(2,'q2'),
	(3,'q3'),
	(4,'q4'),
	(5,'q5'),
	(6,'q6'),
	(7,'q7'),
	(8,'q8'),
	(9,'q9'),
	(10,'q10');

/*!40000 ALTER TABLE `questions` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table users
# ------------------------------------------------------------

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;

INSERT INTO `users` (`id`, `name`)
VALUES
	(1,'dart'),
	(2,'dart'),
	(3,'luk'),
	(4,'aasdasdasd'),
	(5,'Dima'),
	(6,'Dimon'),
	(7,'Dimon'),
	(8,'Dim'),
	(9,'Di'),
	(10,'Dima'),
	(11,'undefined'),
	(12,'lol'),
	(13,'lol'),
	(14,'Gor'),
	(15,'Vas'),
	(16,'aaa'),
	(17,'Ololo'),
	(18,'Kat'),
	(19,'aaa'),
	(20,'xxx');

/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
