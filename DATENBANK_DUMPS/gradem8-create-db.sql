CREATE
DATABASE if not exists GradeM8;
USE
GradeM8;

CREATE TABLE `User`
(
    `ID_User`    INT AUTO_INCREMENT PRIMARY KEY,
    `first_name` VARCHAR(30),
    `last_name`  VARCHAR(30),
    `username`   VARCHAR(32),
    `password`   VARCHAR(255),
    UNIQUE (`username`)
);
CREATE TABLE `Semester`
(
    `ID_Semester` INT AUTO_INCREMENT PRIMARY KEY,
    `name`        VARCHAR(30),
    `User_ID`     INT,
    FOREIGN KEY (`User_ID`)
        REFERENCES `User` (`ID_User`)
        ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE `Subject`
(
    `ID_Subject`  INT AUTO_INCREMENT PRIMARY KEY,
    `name`        VARCHAR(30),
    `ects_count`  INT,
    `Semester_ID` INT,
    FOREIGN KEY (`Semester_ID`)
        REFERENCES `Semester` (`ID_Semester`)
        ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE `Grade`
(
    `ID_Grade`    INT AUTO_INCREMENT PRIMARY KEY,
    `description` VARCHAR(100),
    `value`       FLOAT,
    `weight`      FLOAT,
    `date`        DATE,
    `Subject_ID`  INT,
    FOREIGN KEY (`Subject_ID`)
        REFERENCES `Subject` (`ID_Subject`)
        ON DELETE CASCADE ON UPDATE CASCADE
);