--create database
CREATE DATABASE `profiles`;

--userlogin
CREATE TABLE `userlogin` (
 `id` int(11) NOT NULL AUTO_INCREMENT,
 `first_name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
 `last_name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
 `email` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
 `password` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
 `created` datetime NOT NULL,
 `modified` datetime NOT NULL,
 PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--table for threads
CREATE TABLE `threads` (`id` int(11) NOT NULL AUTO_INCREMENT, `authorEmail` TEXT COLLATE utf8_unicode_ci,`authorID` TEXT COLLATE utf8_unicode_ci, `Name` TEXT COLLATE utf8_unicode_ci, `Description` TEXT COLLATE utf8_unicode_ci, `created` datetime NOT NULL, PRIMARY KEY (`id`))ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--table for comments on threads
CREATE TABLE `comments` (`id` int(11) NOT NULL AUTO_INCREMENT, `threadName` TEXT COLLATE utf8_unicode_ci, `commentEmail` TEXT COLLATE utf8_unicode_ci,`authorID` TEXT COLLATE utf8_unicode_ci, `text` TEXT COLLATE utf8_unicode_ci, `created` datetime NOT NULL, PRIMARY KEY (`id`))ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;