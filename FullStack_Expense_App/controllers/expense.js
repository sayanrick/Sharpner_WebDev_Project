const Expense = require("../models/expense");

exports.addExpense = async (req, res, next) => {
  try {
    const expenseAmount = req.body.expenseAmount;
    const description = req.body.description;
    const category = req.body.category;

    const data = await Expense.create({
      expenseAmount: expenseAmount,
      description: description,
      category: category,
    });
    res.status(200).json({ newExpenseDetail: data });
  } catch (err) {
    console.log(err);
    res.sendStatus(500).json({ error: err });
  }
};

exports.getExpense = async (req, res, next) => {
  try {
    const expenses = await Expense.findAll();
    res.status(200).json({ allExpenses: expenses });
  } catch (err) {
    console.log("Get Expense is failing", JSON.stringify(err));
    res.status(500).json({ error: err });
  }
};

exports.editExpense = async (req, res, next) => {
  try {
    const expenseId = req.params.id;
    const updatedData = {
      expenseAmount: req.body.expenseAmount,
      description: req.body.description,
      category: req.body.category,
    };

    const expense = await Expense.findOne({ where: { id: expenseId } });
    if (!expense) {
      return res.status(404).json({ error: "Expense does not exist" });
    }

    await Expense.update(updatedData, { where: { id: expenseId } });
    res.status(200).json({ message: "Expense updated successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};

exports.deleteExpense = async (req, res, next) => {
  try {
    if (req.params.id == "undefined") {
      console.log("ID is missing");
      return res.status(400).json({ error: "ID is missing" });
    }
    const eId = req.params.id;
    await Expense.destroy({ where: { id: eId } });
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
