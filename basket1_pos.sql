-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 08, 2023 at 12:19 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `basket1_pos`
--

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `customer_ID` int(11) NOT NULL,
  `customer_name` varchar(255) NOT NULL,
  `customer_phone` varchar(50) NOT NULL,
  `customer_eMail` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`customer_ID`, `customer_name`, `customer_phone`, `customer_eMail`) VALUES
(1, 'John Doe', '02222', 'JohnDoe@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `employees`
--

CREATE TABLE `employees` (
  `employee_ID` int(11) NOT NULL,
  `employee_name` varchar(255) NOT NULL,
  `employee_phone` varchar(50) NOT NULL,
  `employee_eMail` varchar(50) NOT NULL,
  `employee_role` varchar(50) NOT NULL,
  `employee_password` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `employees`
--

INSERT INTO `employees` (`employee_ID`, `employee_name`, `employee_phone`, `employee_eMail`, `employee_role`, `employee_password`) VALUES
(1, 'admin', '092922', 'admin@admin', 'admin', '1234');

-- --------------------------------------------------------

--
-- Table structure for table `garments`
--

CREATE TABLE `garments` (
  `garment_ID` int(11) NOT NULL,
  `garment_name` varchar(50) NOT NULL,
  `price` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `garments`
--

INSERT INTO `garments` (`garment_ID`, `garment_name`, `price`) VALUES
(1, 'Shirt', 20.00),
(2, 'Pants', 15.00),
(3, 'Socks', 10.00),
(4, 'Suit', 100.00);

-- --------------------------------------------------------

--
-- Table structure for table `inventory`
--

CREATE TABLE `inventory` (
  `item_ID` int(11) NOT NULL,
  `item_name` varchar(50) NOT NULL,
  `quantity` float NOT NULL,
  `supplier_ID` int(11) DEFAULT NULL,
  `reorder_level` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `inventory`
--

INSERT INTO `inventory` (`item_ID`, `item_name`, `quantity`, `supplier_ID`, `reorder_level`) VALUES
(1, 'Laundry Detergent', 1000, 1, 100);

-- --------------------------------------------------------

--
-- Table structure for table `itemsused`
--

CREATE TABLE `itemsused` (
  `itemsUsed_ID` int(11) NOT NULL,
  `item_ID` int(11) NOT NULL,
  `amount_used` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `orderdetails`
--

CREATE TABLE `orderdetails` (
  `OrderDetails_ID` int(11) NOT NULL,
  `order_ID` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `order_price` decimal(10,2) NOT NULL,
  `service_ID` int(11) NOT NULL,
  `garment` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `order_ID` int(11) NOT NULL,
  `customer_ID` int(11) NOT NULL,
  `employee_ID` int(11) NOT NULL,
  `order_status` enum('Pending','Processing','Finished') DEFAULT 'Pending',
  `order_date` date NOT NULL,
  `order_pickup` date NOT NULL,
  `order_total` decimal(10,2) NOT NULL,
  `order_paidAmount` decimal(10,2) NOT NULL,
  `payment_method` varchar(50) NOT NULL,
  `Remarks` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `perpieceservices`
--

CREATE TABLE `perpieceservices` (
  `pService_ID` int(11) NOT NULL,
  `pService_name` varchar(250) DEFAULT NULL,
  `pService_description` varchar(250) DEFAULT NULL,
  `pService_price` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `services`
--

CREATE TABLE `services` (
  `service_ID` int(11) NOT NULL,
  `service_name` varchar(50) NOT NULL,
  `service_description` varchar(255) NOT NULL,
  `service_price` decimal(10,2) NOT NULL,
  `chargePer` enum('Weight','Piece') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `services`
--

INSERT INTO `services` (`service_ID`, `service_name`, `service_description`, `service_price`, `chargePer`) VALUES
(1, 'Wash & Fold ', 'Charge per Kg', 30.00, 'Weight'),
(2, 'Dry Clean', 'Clean dry', 0.00, 'Piece'),
(3, 'Wash-Dry-Press', 'wdp', 60.00, 'Weight');

-- --------------------------------------------------------

--
-- Table structure for table `supplier`
--

CREATE TABLE `supplier` (
  `Supplier_ID` int(11) NOT NULL,
  `Supplier_code` varchar(50) NOT NULL,
  `Supplier_name` varchar(50) NOT NULL,
  `Supplier_contact` varchar(50) NOT NULL,
  `Supplier_eMail` varchar(50) NOT NULL,
  `Supplier_address` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `supplier`
--

INSERT INTO `supplier` (`Supplier_ID`, `Supplier_code`, `Supplier_name`, `Supplier_contact`, `Supplier_eMail`, `Supplier_address`) VALUES
(1, '121', 'Landry', '90219301', 'landry@mail.com', '223, Xamp street Cebu Manila');

-- --------------------------------------------------------

--
-- Table structure for table `supplyorder`
--

CREATE TABLE `supplyorder` (
  `SupplyOrder_ID` int(11) NOT NULL,
  `Supplier_ID` int(11) NOT NULL,
  `quantity` float NOT NULL,
  `total_price` decimal(10,2) NOT NULL,
  `order_date` date NOT NULL,
  `expected_arrival` date NOT NULL,
  `status` enum('Delivering','Received') DEFAULT 'Delivering',
  `unit_price` decimal(10,2) DEFAULT NULL,
  `item_ID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`customer_ID`);

--
-- Indexes for table `employees`
--
ALTER TABLE `employees`
  ADD PRIMARY KEY (`employee_ID`);

--
-- Indexes for table `garments`
--
ALTER TABLE `garments`
  ADD PRIMARY KEY (`garment_ID`);

--
-- Indexes for table `inventory`
--
ALTER TABLE `inventory`
  ADD PRIMARY KEY (`item_ID`),
  ADD KEY `supplier_ID` (`supplier_ID`);

--
-- Indexes for table `itemsused`
--
ALTER TABLE `itemsused`
  ADD PRIMARY KEY (`itemsUsed_ID`),
  ADD KEY `item_ID` (`item_ID`);

--
-- Indexes for table `orderdetails`
--
ALTER TABLE `orderdetails`
  ADD PRIMARY KEY (`OrderDetails_ID`),
  ADD KEY `order_ID` (`order_ID`),
  ADD KEY `service_FK` (`service_ID`),
  ADD KEY `garment_FK` (`garment`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_ID`),
  ADD KEY `customer_ID` (`customer_ID`),
  ADD KEY `employee_ID` (`employee_ID`);

--
-- Indexes for table `perpieceservices`
--
ALTER TABLE `perpieceservices`
  ADD PRIMARY KEY (`pService_ID`);

--
-- Indexes for table `services`
--
ALTER TABLE `services`
  ADD PRIMARY KEY (`service_ID`);

--
-- Indexes for table `supplier`
--
ALTER TABLE `supplier`
  ADD PRIMARY KEY (`Supplier_ID`);

--
-- Indexes for table `supplyorder`
--
ALTER TABLE `supplyorder`
  ADD PRIMARY KEY (`SupplyOrder_ID`),
  ADD KEY `Supplier_ID` (`Supplier_ID`),
  ADD KEY `item_ID` (`item_ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `customer_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `employees`
--
ALTER TABLE `employees`
  MODIFY `employee_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `garments`
--
ALTER TABLE `garments`
  MODIFY `garment_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `inventory`
--
ALTER TABLE `inventory`
  MODIFY `item_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `itemsused`
--
ALTER TABLE `itemsused`
  MODIFY `itemsUsed_ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `orderdetails`
--
ALTER TABLE `orderdetails`
  MODIFY `OrderDetails_ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `order_ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `perpieceservices`
--
ALTER TABLE `perpieceservices`
  MODIFY `pService_ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `services`
--
ALTER TABLE `services`
  MODIFY `service_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `supplier`
--
ALTER TABLE `supplier`
  MODIFY `Supplier_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `supplyorder`
--
ALTER TABLE `supplyorder`
  MODIFY `SupplyOrder_ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `inventory`
--
ALTER TABLE `inventory`
  ADD CONSTRAINT `inventory_ibfk_1` FOREIGN KEY (`supplier_ID`) REFERENCES `supplier` (`Supplier_ID`);

--
-- Constraints for table `itemsused`
--
ALTER TABLE `itemsused`
  ADD CONSTRAINT `itemsused_ibfk_1` FOREIGN KEY (`itemsUsed_ID`) REFERENCES `orderdetails` (`OrderDetails_ID`),
  ADD CONSTRAINT `itemsused_ibfk_2` FOREIGN KEY (`item_ID`) REFERENCES `inventory` (`item_ID`);

--
-- Constraints for table `orderdetails`
--
ALTER TABLE `orderdetails`
  ADD CONSTRAINT `garment_FK` FOREIGN KEY (`garment`) REFERENCES `garments` (`garment_ID`),
  ADD CONSTRAINT `orderdetails_ibfk_1` FOREIGN KEY (`order_ID`) REFERENCES `orders` (`order_ID`),
  ADD CONSTRAINT `service_FK` FOREIGN KEY (`service_ID`) REFERENCES `services` (`service_ID`);

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`customer_ID`) REFERENCES `customers` (`customer_ID`),
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`employee_ID`) REFERENCES `employees` (`employee_ID`);

--
-- Constraints for table `supplyorder`
--
ALTER TABLE `supplyorder`
  ADD CONSTRAINT `supplyorder_ibfk_1` FOREIGN KEY (`Supplier_ID`) REFERENCES `supplier` (`Supplier_ID`),
  ADD CONSTRAINT `supplyorder_ibfk_2` FOREIGN KEY (`item_ID`) REFERENCES `inventory` (`item_ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
