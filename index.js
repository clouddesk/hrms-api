const express = require("express");
const app = express();
const sequelize = require("./startup/db");

require("./startup/routes")(app);
require("./startup/config")();

sequelize
  // .sync({ force: true })
  .sync()
  .then(() => {
    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`Listening on port ${port}...`));
  })
  .catch(err => console.log(err));


/* 
CREATE SCHEMA `hrms` DEFAULT CHARACTER SET utf8 ;
INSERT INTO `hrms`.`menus` VALUES (1,1,'Employee','/employee','person','This is a test',0,0,'2019-01-15 18:58:31','2019-01-15 18:58:31'),(2,0,'Admnistration','/admin','settings','Manage configuration of the system and security/access rights',0,0,'2019-01-15 20:27:21','2019-01-15 20:27:21'),(3,2,'Attendance','/attendance','access_alarm','Track employee attendance by checking them in/out through face scanning',0,0,'2019-01-15 20:30:24','2019-01-15 20:30:24');
INSERT INTO `hrms`.`companies` VALUES (1,'clouddesk','2019-01-15 18:58:31','2019-01-15 18:58:31');
*/


/* 
DELIMITER $$
CREATE PROCEDURE `filldates`(dateStart DATE, dateEnd DATE, in_projectId INT)
BEGIN
SET @@SESSION.group_concat_max_len = 1000000;

DROP TEMPORARY TABLE IF EXISTS DATES;
CREATE TEMPORARY TABLE DATES (
_date DATE NOT NULL
);
WHILE dateStart <= dateEnd DO
INSERT INTO DATES (_date) VALUES (dateStart);
SET dateStart = date_add(dateStart, INTERVAL 1 DAY);
END WHILE;

IF (in_projectId IS NOT NULL) THEN 
CREATE TEMPORARY TABLE IF NOT EXISTS DATES2 AS (
SELECT D._date, CONCAT(E.firstName,' ',E.lastName) AS employee_name, employeeId,entertime,exittime FROM DATES D LEFT JOIN (
select A.employeeId,A.createdAt AS entertime, B.createdAt AS exittime, A.enteredAt, B.exitedAt from (
SELECT 
`attendances`.`eventTypeId`,
DATE(`attendances`.`createdAt`) AS `enteredAt`,
`attendances`.`createdAt`,
`attendances`.`employeeId`,
`attendances`.`projectId`
FROM `attendances` where eventTypeId = 1 AND projectId = in_projectId
) A LEFT JOIN 
(
SELECT 
`attendances`.`eventTypeId`,
DATE(`attendances`.`createdAt`) AS `exitedAt`,
`attendances`.`createdAt`,
`attendances`.`employeeId`,
`attendances`.`projectId`
FROM `attendances` where eventTypeId = 2 AND projectId = in_projectId
) B ON A.employeeId = B.employeeId AND A.enteredAt = B.exitedAt
) C ON D._date = C.enteredAt
LEFT JOIN employees E ON C. employeeId = E.id 
);
ELSE
CREATE TEMPORARY TABLE IF NOT EXISTS DATES2 AS (
SELECT D._date, CONCAT(E.firstName,' ',E.lastName) AS employee_name, employeeId,entertime,exittime FROM DATES D LEFT JOIN (
select A.employeeId,A.createdAt AS entertime, B.createdAt AS exittime, A.enteredAt, B.exitedAt from (
SELECT 
`attendances`.`eventTypeId`,
DATE(`attendances`.`createdAt`) AS `enteredAt`,
`attendances`.`createdAt`,
`attendances`.`employeeId`,
`attendances`.`projectId`
FROM `attendances` where eventTypeId = 1
) A LEFT JOIN 
(
SELECT 
`attendances`.`eventTypeId`,
DATE(`attendances`.`createdAt`) AS `exitedAt`,
`attendances`.`createdAt`,
`attendances`.`employeeId`,
`attendances`.`projectId`
FROM `attendances` where eventTypeId = 2
) B ON A.employeeId = B.employeeId AND A.enteredAt = B.exitedAt
) C ON D._date = C.enteredAt
LEFT JOIN employees E ON C. employeeId = E.id 
);
END IF;

SET @sql = NULL;
SELECT
GROUP_CONCAT(DISTINCT
CONCAT(

'max(case when _date = ''',
_date,
''' then CONCAT(IFNULL(TIME(entertime),''''), IF(TIME(entertime) IS NOT NULL AND TIME(exittime) IS NOT NULL,''|'',''''), IFNULL(TIME(exittime),'''')) else NULL end) AS ',
'`',
_date,
'`'
)
) INTO @sql
FROM DATES2;


SET @sql = CONCAT('SELECT employeeId, MAX(employee_name) as employeeName, ', @sql, ' FROM DATES2 WHERE employeeId IS NOT NULL GROUP BY employeeId');

#select @sql;

PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SET @@SESSION.group_concat_max_len = 1024;

DROP TEMPORARY TABLE IF EXISTS DATES;
DROP TEMPORARY TABLE IF EXISTS DATES2;

END$$
DELIMITER ;
 */