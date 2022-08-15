const incomeSection = document.querySelector('.income-area');
const expensesSection = document.querySelector('.expenses-area');
const availableMoney = document.querySelector('.available-money');
const addtransactionPanel = document.querySelector('.add-transaction-panel');

const nameInput = document.querySelector('#name');
const amountInput = document.querySelector('#amount');
const categorySelect = document.querySelector('#category');

const addtransactionBtn = document.querySelector('.add-transaction');
const saveBtn = document.querySelector('.save');
const cancelBtn = document.querySelector('.cancel');
const deleteBtn = document.querySelector('.delete');
const deleteAllBtn = document.querySelector('.delete-all');

const light = document.querySelector('.light')
const dark = document.querySelector('.dark')

let root = document.documentElement;
let ID = 0;
let categoryIcon;
let selectedCategory;
let moneyArr = [0];

//opening panel window
const showPanel = () => {
	addtransactionPanel.style.display = 'flex';
};

//closing panel window
const closePanel = () => {
	addtransactionPanel.style.display = 'none';
	clearInputs();
};

//checking if all inputs all filled
const checkForm = () => {
	if (
		nameInput.value !== '' &&
		amountInput.value !== '' &&
		categorySelect.value !== 'none'
	) {
		createNewTransaction();
	} else {
		alert('Fill all the gaps');
	}
};

//clearing inputs after clicking cancel button
const clearInputs = () => {
	nameInput.value = '';
	amountInput.value = '';
	categorySelect.selectedIndex = 0;
};

const createNewTransaction = () => {
	const newTransaction = document.createElement('div');
	newTransaction.classList.add('transaction');
	newTransaction.setAttribute('id', ID);

	checkCategory(selectedCategory);

	newTransaction.innerHTML = `
    <p class="transaction-name">${categoryIcon} ${nameInput.value}</p>
    <p class="transaction-amount">${amountInput.value}zł
        <button class="delete" onclick="deleteTransaction(${ID})"><i class="fas fa-times"></i></button>
    </p>
    `;
	//checking if we type plus or minus value and adding to proper transaction type
	amountInput.value > 0
		? incomeSection.appendChild(newTransaction) &&
		  newTransaction.classList.add('income')
		: expensesSection.appendChild(newTransaction) &&
		  newTransaction.classList.add('expense');

	moneyArr.push(parseFloat(amountInput.value));
	countMoney(moneyArr);
	closePanel();
	ID++;
	clearInputs();
};

const selectCategory = () => {
	selectedCategory = categorySelect.options[categorySelect.selectedIndex].text;
};

//checking type of transaction
const checkCategory = (transaction) => {
	switch (transaction) {
		case '[ + } Income':
			categoryIcon = '<i class="fas fa-money-bill-wave"></i>';
			break;

		case '[ - ] Shopping':
			categoryIcon = '<i class="fas fa-cart-arrow-down"></i>';
			break;

		case '[ - ] Food':
			categoryIcon = '<i class="fas fa-hamburger"></i>';
			break;

		case '[ - ] Movie':
			categoryIcon = '<i class="fas fa-film"></i>';
			break;
	}
};

//counting oney in array if plus add if minus divide

const countMoney = (money) => {
	const newMoney = money.reduce((a, b) => a + b);
	availableMoney.textContent = `${newMoney} zł`;
};


//deleting transaction from incom area and divide from array
const deleteTransaction = (id) => {
	const transactionToDelete = document.getElementById(id);

	const transactionAmount = parseFloat(
		transactionToDelete.childNodes[3].innerText
	);

	const indexOfTransaction = moneyArr.indexOf(transactionAmount);

	moneyArr.splice(indexOfTransaction, 1);

	transactionToDelete.classList.contains('income') ? incomeSection.removeChild(transactionToDelete) : expensesSection.removeChild(transactionToDelete)

	countMoney(moneyArr);
};

//delecting all transaction
const deleteAllTransactions = () =>{
	incomeSection.innerHTML = '<h3>Income:</h3>'
	expensesSection.innerHTML = '<h3>Expenses:</h3>'
	availableMoney.textContent = '0zł'
	moneyArr = [0];
}


//changing to light style
const changeStyleToLight = () =>{
	root.style.setProperty('--first-color', '#F9F9F9')
	root.style.setProperty('--second-color', '#14161F')
	root.style.setProperty('--border-color', 'rgba(0, 0, 0, .2)')
}

//changing to dark style
const changeStyleToDark = () =>{
	root.style.setProperty('--first-color', '#14161F')
	root.style.setProperty('--second-color', '#F9F9F9')
	root.style.setProperty('--border-color', 'rgba(255,255,255,.4)')
}



addtransactionBtn.addEventListener('click', showPanel);
cancelBtn.addEventListener('click', closePanel);
saveBtn.addEventListener('click', checkForm);
deleteAllBtn.addEventListener('click', deleteAllTransactions)
light.addEventListener('click', changeStyleToLight)
dark.addEventListener('click', changeStyleToDark)
