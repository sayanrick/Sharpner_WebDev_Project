const express = require("express");
const sequelize = require("./util/database");
const cors = require('cors');
require('dotenv').config(); // Load environment variables from .env file


const app = express();

const userRoutes = require('./routes/user');
const expenseRoutes = require('./routes/expense');
const purchaseRoutes = require('./routes/purchase');
const Expense = require("./models/expense");
const User = require("./models/users");
const Order = require("./models/orders");

app.use(express.json());
app.use(cors());
app.use('/user', userRoutes);
app.use('/expense', expenseRoutes);
app.use('/purchase', purchaseRoutes)

User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

sequelize
.sync()
  // .sync( { force : true } )
  .then(() => {
    app.listen(5000, () => {
      console.log("Server is running on port 5000");
    });
  })
  .catch((err) => {
    console.error("Error syncing with the database:", err);
  });
