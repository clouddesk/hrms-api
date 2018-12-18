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
