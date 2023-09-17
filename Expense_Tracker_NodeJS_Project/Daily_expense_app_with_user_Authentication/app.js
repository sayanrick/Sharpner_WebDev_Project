const express = require("express");
const sequelize = require("./util/database");
const cors = require('cors');

const app = express();

const userRoutes = require('./routes/user');
const expenseRoutes = require('./routes/expense');
const Expense = require("./models/expense");
const User = require("./models/users");

app.use(express.json());
app.use(cors());
app.use('/user', userRoutes);
app.use('/expense', expenseRoutes);

User.hasMany(Expense);
Expense.belongsTo(User);

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
