function addNewExpense(event) {
    event.preventDefault();
    const expenseDetails = {
      expenseAmount: event.target.expenseamount.value,
      description: event.target.description.value,
      category: event.target.category.value,
    };
  
    console.log(expenseDetails);
    axios
      .post("http://localhost:5000/expense/addExpense", expenseDetails)
      .then((res) => {
        addNewExpenseToUI(res.data.expense);
        event.target.reset();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  window.addEventListener('DOMContentLoaded', () => {
    axios.get('http://localhost:5000/expense/getExpenses')
    .then(res => {
        res.data.expenses.forEach(expense => {
            addNewExpenseToUI(expense);
        })
    })
    .catch(err => {
        console.log(err);
    })
  });
  
  function addNewExpenseToUI(expense) {
    const parentElement = document.getElementById('listOfExpenses');
    const expenseElementId = `expense-${expense.id}`;
    const listItem = document.createElement('li');
    listItem.id = expenseElementId;
    listItem.innerHTML = `
      ${expense.expenseAmount} - ${expense.description} - ${expense.category}
      <button onclick="deleteExpense(event, ${expense.id})">Delete Expense</button>
    `;
    parentElement.appendChild(listItem);
  }
  
  function removeExpensefromUI(expenseId) {
    const expenseElementId = `expense-${expenseId}`;
    document.getElementById(expenseElementId).remove();
  }

  function deleteExpense(event, expenseId) {
    axios.delete(`http://localhost:5000/expense/deleteExpense/${expenseId}`)
    .then(response => {
        removeExpensefromUI(expenseId);
    })
    .catch(err => {
        console.log(err);
    })
  }