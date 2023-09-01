const express = require("express");
const sequelize = require("./util/database");
const cors = require('cors');

const app = express();

const playerDetailsRoutes = require('./routes/player_details');

app.use(express.json());
app.use(cors());
app.use(playerDetailsRoutes);

sequelize
  .sync( { force : true } )
  .then(() => {
    app.listen(4000, () => {
      console.log("Server is running on port 4000");
    });
  })
  .catch((err) => {
    console.error("Error syncing with the database:", err);
  });
