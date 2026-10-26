const form = document.getElementById("transactionForm");
const titleInput = document.getElementById("title");
const amountInput = document.getElementById("amount");
const typeInput = document.getElementById("type");
const categoryInput = document.getElementById("category");
const dateInput = document.getElementById("date");
const balanceElement = document.getElementById("balance");
const incomeElement = document.getElementById("income");
const expenseElement = document.getElementById("expense");
const transactionList = document.getElementById("transactionList");
const filterInput = document.getElementById("filter");
const searchInput = document.getElementById("search");

// Load saved transactions from this browser.
let transactions = [];
try {
  transactions = JSON.parse(localStorage.getItem("expenseTrackerTransactions")) || [];
  if (!Array.isArray(transactions)) transactions = [];
} catch (error) {
  transactions = [];
}
dateInput.value = new Date().toISOString().slice(0, 10);

form.addEventListener("submit", function (event) {
  event.preventDefault();
  const title = titleInput.value.trim();
  const amount = Number(amountInput.value);
  const date = dateInput.value;

  if (!title || !Number.isFinite(amount) || amount <= 0 || !date) {
    alert("Please enter a valid title, amount and date.");
    return;
  }

  transactions.push({
    id: Date.now(), title: title, amount: amount,
    type: typeInput.value, category: categoryInput.value, date: date
  });

  saveData();
  updateDashboard();
  displayTransactions();
  form.reset();
  dateInput.value = new Date().toISOString().slice(0, 10);
});

function saveData() {
  localStorage.setItem("expenseTrackerTransactions", JSON.stringify(transactions));
}

function formatCurrency(value) {
  return "₹" + value.toLocaleString("en-IN", {
    minimumFractionDigits: 2, maximumFractionDigits: 2
  });
}

function updateDashboard() {
  let totalIncome = 0;
  let totalExpense = 0;
  transactions.forEach(function (item) {
    if (item.type === "income") totalIncome += Number(item.amount);
    else totalExpense += Number(item.amount);
  });
  balanceElement.textContent = formatCurrency(totalIncome - totalExpense);
  incomeElement.textContent = formatCurrency(totalIncome);
  expenseElement.textContent = formatCurrency(totalExpense);
}

function displayTransactions() {
  transactionList.innerHTML = "";
  const selectedType = filterInput.value;
  const searchText = searchInput.value.trim().toLowerCase();

  const filtered = transactions.filter(function (item) {
    const matchesType = selectedType === "all" || item.type === selectedType;
    const matchesSearch = item.title.toLowerCase().includes(searchText);
    return matchesType && matchesSearch;
  });

  if (filtered.length === 0) {
    const message = document.createElement("p");
    message.className = "empty";
    message.textContent = "No transactions found. Add your first transaction!";
    transactionList.appendChild(message);
    return;
  }

  filtered.slice().reverse().forEach(function (item) {
    const row = document.createElement("div");
    row.className = "transaction";
    const info = document.createElement("div");
    info.className = "transaction-info";
    const heading = document.createElement("h3");
    heading.textContent = item.title;
    const details = document.createElement("p");
    details.textContent = `${item.category} · ${item.date} · ${item.type}`;
    info.append(heading, details);

    const right = document.createElement("div");
    right.className = "transaction-right";
    const amount = document.createElement("span");
    amount.className = item.type === "income" ? "amount-income" : "amount-expense";
    amount.textContent = `${item.type === "income" ? "+" : "−"} ${formatCurrency(item.amount)}`;

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-btn";
    deleteButton.type = "button";
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", function () {
      deleteTransaction(item.id);
    });

    right.append(amount, deleteButton);
    row.append(info, right);
    transactionList.appendChild(row);
  });
}

function deleteTransaction(id) {
  transactions = transactions.filter(function (item) {
    return item.id !== id;
  });
  saveData();
  updateDashboard();
  displayTransactions();
}

filterInput.addEventListener("change", displayTransactions);
searchInput.addEventListener("input", displayTransactions);
updateDashboard();
displayTransactions();
