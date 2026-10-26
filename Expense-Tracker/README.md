# Expense Tracker

A moderate-level internship project built using **HTML, CSS and Vanilla JavaScript**.

## Features
- Add income and expense transactions
- Select category and date
- Dashboard for total balance, income and expenses
- Search transactions by title
- Filter by all, income or expenses
- Delete transactions
- Persist data using browser LocalStorage
- Responsive desktop and mobile layout

## Project structure
```text
Expense-Tracker/
├── index.html
├── style.css
├── script.js
└── README.md
```

## Run the project
1. Open this folder in VS Code.
2. Open `index.html` in a browser, or use the Live Server extension.
3. Add transactions and try the search and filter options.

No npm installation or backend is required.

## Technologies
- **HTML:** page structure, forms and transaction list
- **CSS:** layout, cards, colors and responsive styling
- **JavaScript:** event handling, calculations, search, filtering and deletion
- **DOM:** dynamically creates and updates transaction elements
- **LocalStorage:** saves data in the current browser
- **JSON:** converts transaction data to and from a stored string

## How it works
1. The form collects title, amount, type, category and date.
2. JavaScript validates the input and adds a transaction object to an array.
3. `JSON.stringify()` converts the array to a string for LocalStorage.
4. Dashboard totals are calculated from the transaction array.
5. Search and filter controls display matching transactions.
6. Deleting a transaction updates the array, LocalStorage and dashboard.

## Limitation
This is a frontend demo. Data is stored only in the current browser and is not synchronized between users or devices. It has no login or server-side database.
