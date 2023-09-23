async function addNewExpense(event) {
  event.preventDefault();

  // Client-side validation
  const expenseAmount = event.target.expenseamount.value;
  const description = event.target.description.value;
  const category = event.target.category.value;

  if (!expenseAmount || !description || !category) {
    // Display validation error to the user
    alert("Please fill out all fields.");
    return;
  }

  const expenseDetails = {
    expenseAmount,
    description,
    category,
  };

  console.log(expenseDetails);

  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      "http://localhost:5000/expense/addExpense",
      expenseDetails,
      { headers: { Authorization: token } }
    );

    if (response.data.success) {
      addNewExpenseToUI(response.data.expense);
      event.target.reset(); // Reset the form
    } else {
      // Handle API error and display user-friendly message
      alert("Failed to add expense. Please try again later.");
    }
  } catch (err) {
    console.error(err);
    // Handle network error and display user-friendly message
    alert("An error occurred. Please try again later.");
  }
}

window.addEventListener("DOMContentLoaded", async () => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.get("http://localhost:5000/expense/getExpenses", {
      headers: { Authorization: token },
    });
    res.data.expenses.forEach((expense) => {
      addNewExpenseToUI(expense);
    });
  } catch (err) {
    console.error(err);
  }
});

function addNewExpenseToUI(expense) {
  const parentElement = document.getElementById("listOfExpenses");
  const expenseElementId = `expense-${expense.id}`;
  const listItem = document.createElement("li");
  listItem.id = expenseElementId;
  listItem.innerHTML = `
      ${expense.expenseAmount} - ${expense.description} - ${expense.category}
      <button onclick="deleteExpense(event, ${expense.id})">Delete Expense</button>
    `;
  parentElement.appendChild(listItem);
}

async function removeExpenseFromUI(expenseId) {
  const expenseElementId = `expense-${expenseId}`;
  const expenseElement = document.getElementById(expenseElementId);
  if (expenseElement) {
    expenseElement.remove();
  }
}

document.getElementById("rzp-button1").onclick = async function (e) {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      "http://localhost:5000/purchase/premiummembership",
      { headers: { Authorization: token } }
    );
    console.log(response);

    let options = {
      "key": response.data.key_id,
      "order_id": response.data.order.id,
      "handler": async function (response) {
            await axios.post(
            "http://localhost:5000/purchase/updatetransactionstatus",
            {
              order_id: options.order_id,
              payment_id: response.razorpay_payment_id,
            },
            { headers: { Authorization: token } }
          ); 
          alert("You are a Premium User Now");
      },
    };

    const rzpl = new Razorpay(options);
    rzpl.open();
    e.preventDefault();

    rzpl.on("payment.failed", function (response) {
      console.log(response);
      alert("Something went wrong");
    });
};

async function deleteExpense(event, expenseId) {
  try {
    const token = localStorage.getItem('token'); // Retrieve the token from localStorage

    if (!token) {
      // Handle the case where the token is missing or not authenticated
      console.error('Authentication token is missing.');
      alert('Authentication token is missing. Please log in.');
      return;
    }

    const response = await axios.delete(
      `http://localhost:5000/expense/deleteExpense/${expenseId}`,
      { headers: { Authorization: token } }
    );

    if (response.status === 200) {
      // Assuming a successful response has a status code of 200
      removeExpenseFromUI(expenseId);
      alert('Expense deleted successfully.');
    } else {
      console.error('Unexpected status code:', response.status);
      alert('Failed to delete expense. Please try again.');
    }
  } catch (err) {
    console.error('An error occurred while deleting the expense:', err);
    alert('An error occurred while deleting the expense. Please try again.');
  }
}

