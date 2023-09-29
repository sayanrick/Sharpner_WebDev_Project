const User = require("../models/users");
const Expense = require("../models/expense");
const Sequelize = require("../util/database");

exports.getUserLeaderBoard = async (req, res) => {
  try {
    const users = await User.findAll({
        attributes: ['id', 'name']
    });
    const expenses = await Expense.findAll({
        attributes: ['userId', 'expenseAmount']
    });
    
    const userAggregatedExpenses = {};
    // console.log( "User>>", users);
    console.log("Expenses>>", expenses);
    
    expenses.forEach((expense) => {
      if (userAggregatedExpenses[expense.userId]) {
        userAggregatedExpenses[expense.userId] =
          userAggregatedExpenses[expense.userId] + expense.expenseAmount;
      } else {
        userAggregatedExpenses[expense.userId] = expense.expenseAmount;
      }
    });
    let userLeaderBoardDetails = [];
    users.forEach((user) => {
      userLeaderBoardDetails.push({
        name: user.name,
        total_cost: userAggregatedExpenses[user.id] || 0
      });
    });
    console.log("UserLeaderBoardDetails >>>>>>>>>", userLeaderBoardDetails);
    userLeaderBoardDetails.sort((a, b) => b.total_cost - a.total_cost)
    res.status(200).json(userLeaderBoardDetails);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
