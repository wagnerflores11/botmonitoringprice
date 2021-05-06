CREATE DATABASE  IF NOT EXISTS `base` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `base`;

DROP TABLE IF EXISTS `tb_products`;

CREATE TABLE `tb_products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `price` varchar(128) NOT NULL,
  `name` varchar(512) NOT NULL,
  `register` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--

LOCK TABLES `tb_products` WRITE;



UNLOCK TABLES;