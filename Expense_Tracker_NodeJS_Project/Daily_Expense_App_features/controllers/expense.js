const Expense = require("../models/expense");

exports.addExpense = async (req, res, next) => {
  try {
    const { expenseAmount, description, category } = req.body;

    if (expenseAmount == undefined || expenseAmount.length > 0) {
      return res
        .status(400)
        .json({ success: false, message: "Parameters missing" });
    }
    const newExpense = await Expense.create({
      expenseAmount,
      description,
      category,
    });
    res.status(201).json(newExpense);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
};

exports.getExpenses = async (req, res, next) => {
  try {
    const expenses = await Expense.findAll();
    return res.status(200).json({ success: true, expenses });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, error: err });
  }
};

exports.deleteExpense = async (req, res) => {
  const expenseId = req.params.expenseId;
  if (expenseId === undefined || expenseId.length === 0) {
    return res.status(400).json({ success: false });
  }

  try {
    await Expense.destroy({ where: { id: expenseId } });
    return res
      .status(200)
      .json({ success: true, message: "Deleted Successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Failed" });
  }
};
