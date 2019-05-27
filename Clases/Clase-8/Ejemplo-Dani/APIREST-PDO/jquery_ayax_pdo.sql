-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 13, 2019 at 03:06 AM
-- Server version: 10.1.37-MariaDB
-- PHP Version: 5.6.40

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `jquery_ayax_pdo`
--
CREATE DATABASE IF NOT EXISTS `jquery_ayax_pdo` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `jquery_ayax_pdo`;

-- --------------------------------------------------------

--
-- Table structure for table `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `apellido` varchar(50) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `nombre` varchar(50) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `legajo` int(11) NOT NULL,
  `sueldo` int(11) NOT NULL,
  `foto` varchar(50) COLLATE utf8mb4_spanish2_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Dumping data for table `usuarios`
--

INSERT INTO `usuarios` (`id`, `apellido`, `nombre`, `legajo`, `sueldo`, `foto`) VALUES
(1, 'hfhf', 'fhfh', 5555, 25525, '20190513_020033.5555_hfhf.jpg'),
(2, 'Velez', 'Emanuel', 1234, 654568, '20190513_020124.1234_Velez.jpg'),
(3, 'Teobi', 'Jed', 2586, 85875, '20190513_020244.2586_Teobi.jpg'),
(4, 'Ramirez', 'Teresa', 8550, 2555, '20190513_020321.8550_Ramirez.jpg'),
(5, 'Perez', 'Analia', 7325, 8282, '20190513_020646.7325_Perez.jpg'),
(6, 'Tomadin', 'Mario', 5650, 5525, '20190513_020910.5650_Tomadin.jpg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
