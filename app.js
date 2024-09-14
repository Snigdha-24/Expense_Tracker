let expenses = [];
let totalAmount = 0;

const categorySelect = document.getElementById('category-select');
const amountInput = document.getElementById('amount-input');
const dateInput = document.getElementById('date-input');
const addBtn = document.getElementById('add-btn');
const expensesTableBody = document.getElementById('expense-table-body');
const totalAmountCell = document.getElementById('total-amount');
const categoryTotalSelect = document.getElementById('category-total-select');
const categoryTotalBtn = document.getElementById('category-total-btn');
const dayTotalInput = document.getElementById('day-total-input');
const dayTotalBtn = document.getElementById('day-total-btn');
const monthTotalInput = document.getElementById('month-total-input');
const monthTotalBtn = document.getElementById('month-total-btn');
const categoryTotalDisplay = document.getElementById('category-total-display');
const dayTotalDisplay = document.getElementById('day-total-display');
const monthTotalDisplay = document.getElementById('month-total-display');
const addCategoryBtn = document.getElementById('add-category-btn');
const newCategoryInput = document.getElementById('new-category-input');

const errorMessages = {
    category: 'Please select a category',
    amount: 'Please enter a valid amount',
    date: 'Please select a date'
};

// Function to add a new custom category
function addCustomCategory(category) {
    const newOption = document.createElement('option');
    newOption.value = category;
    newOption.textContent = category;

    // Append to both category select dropdowns
    categorySelect.appendChild(newOption);
    categoryTotalSelect.appendChild(newOption.cloneNode(true)); // Clone to avoid reference issue
}

// Event listener to add a new custom category
addCategoryBtn.addEventListener('click', function() {
    const newCategory = newCategoryInput.value.trim();
    if (newCategory !== '') {
        addCustomCategory(newCategory);
        newCategoryInput.value = '';
    } else {
        alert('Please enter a valid category name.');
    }
});

// Function to display expenses
function renderExpenses() {
    expensesTableBody.innerHTML = '';

    expenses.forEach((expense, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${expense.category}</td>
            <td>$${expense.amount.toFixed(2)}</td>
            <td>${expense.date}</td>
            <td><button class="edit-btn" onclick="editExpense(${index})">Edit</button></td>
            <td><button class="delete-btn" onclick="deleteExpense(${index})">Delete</button></td>
        `;
        expensesTableBody.appendChild(row);
    });
}

// Function to handle adding a new expense
function addExpense() {
    const category = categorySelect.value;
    const amount = parseFloat(amountInput.value);
    const date = dateInput.value;

    if (!category) {
        alert(errorMessages.category);
        return;
    }

    if (isNaN(amount) || amount <= 0) {
        alert(errorMessages.amount);
        return;
    }

    if (!date) {
        alert(errorMessages.date);
        return;
    }

    const expense = { category, amount, date };
    expenses.push(expense);
    totalAmount += amount;

    renderExpenses();
    totalAmountCell.textContent = totalAmount.toFixed(2);

    // Clear input fields
    categorySelect.value = '';
    amountInput.value = '';
    dateInput.value = '';
}

// Function to delete an expense
function deleteExpense(index) {
    totalAmount -= expenses[index].amount;
    expenses.splice(index, 1);
    renderExpenses();
    totalAmountCell.textContent = totalAmount.toFixed(2);
}

// Function to edit an expense
function editExpense(index) {
    const expense = expenses[index];
    categorySelect.value = expense.category;
    amountInput.value = expense.amount;
    dateInput.value = expense.date;

    deleteExpense(index); // Remove the current entry for editing
}

// Event listener for adding an expense
addBtn.addEventListener('click', addExpense);

// Function to calculate category total
categoryTotalBtn.addEventListener('click', function () {
    const selectedCategory = categoryTotalSelect.value;
    const categoryTotal = expenses
        .filter(expense => expense.category === selectedCategory)
        .reduce((total, expense) => total + expense.amount, 0);

    categoryTotalDisplay.textContent = `Total for ${selectedCategory}: $${categoryTotal.toFixed(2)}`;
});

// Function to calculate daily total
dayTotalBtn.addEventListener('click', function () {
    const selectedDay = dayTotalInput.value;
    const dayTotal = expenses
        .filter(expense => expense.date === selectedDay)
        .reduce((total, expense) => total + expense.amount, 0);

    dayTotalDisplay.textContent = `Total for ${selectedDay}: $${dayTotal.toFixed(2)}`;
});

// Function to calculate monthly total
monthTotalBtn.addEventListener('click', function () {
    const selectedMonth = monthTotalInput.value;
    const monthTotal = expenses
        .filter(expense => expense.date.startsWith(selectedMonth))
        .reduce((total, expense) => total + expense.amount, 0);

    monthTotalDisplay.textContent = `Total for ${selectedMonth}: $${monthTotal.toFixed(2)}`;
});

