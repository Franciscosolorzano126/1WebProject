-- =====================================================
-- BASE DE DATOS: peliculas
-- Modelo relacional: USER, MOVIE, REVIEW y USER_MOVIE
-- MySQL 8.0+
-- =====================================================

CREATE DATABASE IF NOT EXISTS `signdb`
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_0900_ai_ci;

USE `signdb`;

-- TABLA USER
-- Rol predeterminado: 'user'. Los administradores se crean manualmente
-- asignando el valor 'admin'.

CREATE TABLE IF NOT EXISTS `User` (
    `ID` INT NOT NULL AUTO_INCREMENT,
    `firstName` VARCHAR(50) NOT NULL,
    `lastName` VARCHAR(50) NOT NULL,
    `middleInitial` VARCHAR(5) DEFAULT NULL,
    `street` VARCHAR(100) DEFAULT NULL,
    `city` VARCHAR(50) DEFAULT NULL,
    `state` VARCHAR(50) DEFAULT NULL,
    `zip` VARCHAR(10) DEFAULT NULL,
    `phone` VARCHAR(20) DEFAULT NULL,
    `email` VARCHAR(100) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `rol` ENUM('admin', 'user') NOT NULL DEFAULT 'user',
    PRIMARY KEY (`ID`),
    UNIQUE KEY `UK_User_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- TABLA MOVIE

CREATE TABLE IF NOT EXISTS `Movie` (
    `ID` INT NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(150) NOT NULL,
    `year` INT DEFAULT NULL,
    `film_director` VARCHAR(100) DEFAULT NULL,
    `gender` VARCHAR(50) DEFAULT NULL,
    PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- TABLA REVIEW
-- Relaciones 1:N: USER-REVIEW y MOVIE-REVIEW.

CREATE TABLE IF NOT EXISTS `Review` (
    `ID` INT NOT NULL AUTO_INCREMENT,
    `dateTime` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `commentary` TEXT DEFAULT NULL,
    `puntuation` DECIMAL(2,1) NOT NULL,
    `id_movie` INT NOT NULL,
    `id_user` INT NOT NULL,
    PRIMARY KEY (`ID`),
    CONSTRAINT `chk_review_puntuation`
        CHECK (`puntuation` BETWEEN 0 AND 5),
    KEY `idx_review_movie` (`id_movie`),
    KEY `idx_review_user` (`id_user`),
    CONSTRAINT `fk_review_movie`
        FOREIGN KEY (`id_movie`) REFERENCES `Movie` (`ID`)
        ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT `fk_review_user`
        FOREIGN KEY (`id_user`) REFERENCES `User` (`ID`)
        ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- TABLA USER_MOVIE
-- Relación N:M USER-MOVIE para guardar películas favoritas.

CREATE TABLE IF NOT EXISTS `User_Movie` (
    `id_user` INT NOT NULL,
    `id_movie` INT NOT NULL,
    PRIMARY KEY (`id_user`, `id_movie`),
    KEY `idx_user_movie_movie` (`id_movie`),
    CONSTRAINT `fk_user_movie_user`
        FOREIGN KEY (`id_user`) REFERENCES `User` (`ID`)
        ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT `fk_user_movie_movie`
        FOREIGN KEY (`id_movie`) REFERENCES `Movie` (`ID`)
        ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- USUARIO ADMINISTRADOR DE EJEMPLO
-- Credenciales de prueba:
-- Email: admin@peliculas.com
-- Contraseña: cambia_esta_password
--
-- La contraseña se incluye como texto de ejemplo únicamente.
-- En una aplicación real, guarda siempre el hash generado por el backend,
-- nunca la contraseña en texto plano.
INSERT INTO `User`
    (`firstName`, `lastName`, `email`, `password`, `rol`)
VALUES
    ('Admin', 'Principal', 'admin@peliculas.com',
     'CAMBIAR_POR_HASH_SEGURO', 'admin');

-- EJEMPLO: crear un administrador manualmente.
-- Sustituye el hash y los datos por los correspondientes.
--
-- INSERT INTO `User`
--     (`firstName`, `lastName`, `email`, `password`, `rol`)
-- VALUES
--     ('Nombre', 'Administrador', 'admin@ejemplo.com',
--      'HASH_DE_LA_PASSWORD', 'admin');
--
-- Si no se indica el campo rol al registrar un usuario,
-- MySQL asignará automáticamente 'user'.
