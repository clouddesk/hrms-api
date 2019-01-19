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