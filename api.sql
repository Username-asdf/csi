/*
Navicat MySQL Data Transfer

Source Server         : localhost-123456
Source Server Version : 50728
Source Host           : localhost:3306
Source Database       : api

Target Server Type    : MYSQL
Target Server Version : 50728
File Encoding         : 65001

Date: 2021-03-24 20:35:44
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `classes`
-- ----------------------------
DROP TABLE IF EXISTS `classes`;
CREATE TABLE `classes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` int(11) DEFAULT NULL,
  `name` varchar(200) DEFAULT NULL,
  `num` int(11) DEFAULT NULL,
  `code` varchar(8) DEFAULT NULL,
  `createTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of classes
-- ----------------------------

-- ----------------------------
-- Table structure for `classes_users`
-- ----------------------------
DROP TABLE IF EXISTS `classes_users`;
CREATE TABLE `classes_users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cid` int(11) DEFAULT NULL,
  `uid` int(11) DEFAULT NULL,
  `nickName` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of classes_users
-- ----------------------------

-- ----------------------------
-- Table structure for `creategsign`
-- ----------------------------
DROP TABLE IF EXISTS `creategsign`;
CREATE TABLE `creategsign` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cid` int(11) DEFAULT NULL,
  `createTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `validTime` int(11) DEFAULT NULL,
  `password` varchar(9) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of creategsign
-- ----------------------------

-- ----------------------------
-- Table structure for `createlsign`
-- ----------------------------
DROP TABLE IF EXISTS `createlsign`;
CREATE TABLE `createlsign` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cid` int(11) DEFAULT NULL,
  `createTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `validTime` int(11) DEFAULT NULL,
  `longitude` double DEFAULT NULL,
  `latitude` double DEFAULT NULL,
  `radius` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of createlsign
-- ----------------------------

-- ----------------------------
-- Table structure for `createpsign`
-- ----------------------------
DROP TABLE IF EXISTS `createpsign`;
CREATE TABLE `createpsign` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cid` int(11) DEFAULT NULL,
  `createTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `vaildTime` int(11) DEFAULT NULL,
  `password` varchar(4) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of createpsign
-- ----------------------------

-- ----------------------------
-- Table structure for `createsign`
-- ----------------------------
DROP TABLE IF EXISTS `createsign`;
CREATE TABLE `createsign` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cid` int(11) DEFAULT NULL,
  `createTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `validTime` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of createsign
-- ----------------------------

-- ----------------------------
-- Table structure for `gsign`
-- ----------------------------
DROP TABLE IF EXISTS `gsign`;
CREATE TABLE `gsign` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cgsid` int(11) DEFAULT NULL,
  `uid` int(11) DEFAULT NULL,
  `signTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `finish` char(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of gsign
-- ----------------------------

-- ----------------------------
-- Table structure for `invicode`
-- ----------------------------
DROP TABLE IF EXISTS `invicode`;
CREATE TABLE `invicode` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cid` int(11) DEFAULT NULL,
  `code` varchar(8) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of invicode
-- ----------------------------

-- ----------------------------
-- Table structure for `lsign`
-- ----------------------------
DROP TABLE IF EXISTS `lsign`;
CREATE TABLE `lsign` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `clsid` int(11) DEFAULT NULL,
  `uid` int(11) DEFAULT NULL,
  `signTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `longitude` float DEFAULT NULL,
  `latitude` float DEFAULT NULL,
  `finish` char(1) DEFAULT NULL,
  `location` varchar(300) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of lsign
-- ----------------------------

-- ----------------------------
-- Table structure for `psign`
-- ----------------------------
DROP TABLE IF EXISTS `psign`;
CREATE TABLE `psign` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cpsid` int(11) DEFAULT NULL,
  `uid` int(11) DEFAULT NULL,
  `signTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `finish` char(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of psign
-- ----------------------------

-- ----------------------------
-- Table structure for `sign`
-- ----------------------------
DROP TABLE IF EXISTS `sign`;
CREATE TABLE `sign` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `csid` int(11) DEFAULT NULL,
  `uid` int(11) DEFAULT NULL,
  `signTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `finish` char(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sign
-- ----------------------------

-- ----------------------------
-- Table structure for `users`
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `openid` varchar(50) DEFAULT NULL,
  `phone` varchar(11) DEFAULT NULL,
  `sex` char(1) DEFAULT NULL,
  `nickName` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES ('1', 'oGrAO5JE-WiLny1IYDxhozvn2igQ', '0', '1', '.');
