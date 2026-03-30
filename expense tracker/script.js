const form = document.getElementById("expense-form");
const titleInput = document.getElementById("title");
const amountInput = document.getElementById("amount");
const list = document.getElementById("expense-list");
const totalDisplay = document.getElementById("total");

let expenses = [];

// ADD EXPENSE
form.addEventListener("submit", function(e) {
  e.preventDefault();

  const title = titleInput.value;
  const amount = Number(amountInput.value);

  const expense = {
    id: Date.now(),
    title: title,
    amount: amount
  };

  expenses.push(expense);

  addToUI(expense);
  updateTotal();

  form.reset();
  titleInput.focus();
});

// ADD TO UI
function addToUI(expense) {
  const li = document.createElement("li");

  li.innerHTML = `
    ${expense.title} - Rs ${expense.amount}
    <button onclick="deleteExpense(${expense.id})">X</button>
  `;

  list.appendChild(li);
}

// DELETE EXPENSE
function deleteExpense(id) {
  expenses = expenses.filter(exp => exp.id !== id);
  renderList();
  updateTotal();
}

// RENDER LIST
function renderList() {
  list.innerHTML = "";
  expenses.forEach(addToUI);
}

// UPDATE TOTAL
function updateTotal() {
  let total = 0;
  expenses.forEach(exp => total += exp.amount);
  totalDisplay.textContent = total;
}