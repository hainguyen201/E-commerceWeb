CREATE TABLE `SaleDB`.`Product` (
  `ProductID` INT NOT NULL AUTO_INCREMENT COMMENT 'Mã sản phẩm',
  `Name` NVARCHAR(255) NULL COMMENT 'Tên sản phẩm',
  `Price` DECIMAL NULL COMMENT 'G',
  `Content` NVARCHAR(1000) NULL COMMENT 'Nội dung sản phẩm\n',
  `ImageLink` VARCHAR(255) NULL COMMENT 'Ảnh sản phẩm',
  `ImageList` VARCHAR(255) NULL COMMENT 'Danh sách ảnh',
  `CatalogID` INT NULL COMMENT 'Mã danh mục',
  `Discount` INT NULL COMMENT 'Giảm giá : từ 0->100',
  `Remain` INT NULL COMMENT 'Số lượng sản phẩm còn lại',
  PRIMARY KEY (`ProductID`));
  
  
  CREATE TABLE `SaleDB`.`Catalog` (
  `CatalogID` INT NOT NULL AUTO_INCREMENT COMMENT 'Mã danh m',
  `Name` NVARCHAR(255) NULL COMMENT 'Tên danh mục',
  `ParentID` INT NULL COMMENT 'Danh mục có chứa danh mục con',
  PRIMARY KEY (`CatalogID`));
  
  CREATE TABLE `SaleDB`.`User` (
  `UserID` INT NOT NULL AUTO_INCREMENT,
  `Name` NVARCHAR(255) NULL,
  `Email` VARCHAR(255) NULL,
  `Phone` VARCHAR(255) NULL,
  `Address` NVARCHAR(255) NULL,
  `Password` VARCHAR(50) NULL,
  `UserName` VARCHAR(50) NULL,
  PRIMARY KEY (`UserID`));
  
  CREATE TABLE `SaleDB`.`Transaction` (
  `TransactionID` INT NOT NULL AUTO_INCREMENT COMMENT 'Mã giao dịch',
  `UserID` INT NULL COMMENT 'ID của user giao dịch',
  `Payment` DECIMAL NULL COMMENT 'Tổng giá trị thanh toán',
  `PaymentInfo` NVARCHAR(1000) NULL COMMENT 'Thông tin thanh toán cụ thể: thời gian, sản phẩm số lượng',
  `Message` VARCHAR(255) NULL COMMENT 'Tin nhắn cho người bán',
  `Security` VARCHAR(16) NULL COMMENT 'Khóa bảo mật\n',
  `DateCreated` DATE NULL COMMENT 'Ngày tạo',
  PRIMARY KEY (`TransactionID`));
  
  CREATE TABLE `SaleDB`.`Order` (
  `OrderID` INT NOT NULL,
  `ProductID` INT NULL,
  `TransactionID` INT NULL,
  `Amount` DECIMAL NULL DEFAULT 0,
  `Status` INT NULL DEFAULT 0,
  PRIMARY KEY (`OrderID`));
  
  ALTER TABLE `SaleDB`.`Product` 
ADD INDEX `fk_Product_1_idx` (`CatalogID` ASC) VISIBLE;
;
ALTER TABLE `SaleDB`.`Product` 
ADD CONSTRAINT `fk_Product_1`
  FOREIGN KEY (`CatalogID`)
  REFERENCES `SaleDB`.`Catalog` (`CatalogID`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;
  
ALTER TABLE `SaleDB`.`Order` 
CHANGE COLUMN `Status` `Status` INT NULL DEFAULT 0 COMMENT 'Trạng thái giao dịch:\\n0- đang trong giỏ hàng chưa thực hiện giao dịch\\n1- giao dịch đã thực h' ,
ADD INDEX `fk_Order_1_idx` (`ProductID` ASC) VISIBLE;
;
ALTER TABLE `SaleDB`.`Order` 
ADD CONSTRAINT `fk_Order_1`
  FOREIGN KEY (`ProductID`)
  REFERENCES `SaleDB`.`Order` (`OrderID`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;

