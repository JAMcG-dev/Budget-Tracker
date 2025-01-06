document.addEventListener('DOMContentLoaded', function () {
    // DOM elements
    const form = document.getElementById('transaction-form');
    const descriptionInput = document.getElementById('description');
    const amountInput = document.getElementById('amount');
    const typeSelect = document.getElementById('type');
    const transactionList = document.getElementById('transaction-list');
    const totalIncome = document.getElementById('total-income');
    const totalExpenses = document.getElementById('total-expenses');
    const balance = document.getElementById('balance');

    // Initialize transactions from localStorage or empty array
    let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

    // Function to update the UI
    function updateUI() {
        // Clear the list
        transactionList.innerHTML = '';

        // Calculate totals
        let income = 0;
        let expenses = 0;

        transactions.forEach(transaction => {
            // Display each transaction
            const li = document.createElement('li');
            li.textContent = `${transaction.description}: $${transaction.amount}`;
            transactionList.appendChild(li);

            // Calculate income and expenses
            if (transaction.type === 'income') {
                income += parseFloat(transaction.amount);
            } else {
                expenses += parseFloat(transaction.amount);
            }
        });

        // Update summary
        totalIncome.textContent = income.toFixed(2);
        totalExpenses.textContent = expenses.toFixed(2);
        balance.textContent = (income - expenses).toFixed(2);

        // Save to localStorage
        localStorage.setItem('transactions', JSON.stringify(transactions));
    }

    // Handle form submission
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        // Get input values
        const description = descriptionInput.value;
        const amount = amountInput.value;
        const type = typeSelect.value;

        // Validate inputs
        if (description === '' || amount === '') {
            alert('Please fill in both fields.');
            return;
        }

        // Add the new transaction
        const transaction = {
            description,
            amount,
            type
        };
        transactions.push(transaction);

        // Clear form inputs
        descriptionInput.value = '';
        amountInput.value = '';

        // Update the UI
        updateUI();
    });

    // Initial UI update
    updateUI();
});

