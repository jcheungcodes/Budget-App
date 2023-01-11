let budgetSet = document.getElementById("budget-set");
let productCost = document.getElementById("product-cost");
const addAmount = document.getElementById("add-amount");
const setAmount = document.getElementById("set-amount");
const productName = document.getElementById("product-name");
const amount = document.getElementById("amount");
const expenditure = document.getElementById("expenditure");
const balance = document.getElementById("balance");
const list = document.getElementById("list");
let tempAmount = 0;

setAmount.addEventListener("click", () => {
  tempAmount = budgetSet.value;
  amount.innerHTML = tempAmount;
  balance.innerText = tempAmount - expenditure.innerText;
  budgetSet.value = '';
});

const modifyItem = (element, edit = false) => {
  let parentDiv = element.parentElement;
  let nowBalance = balance.innerText;
  let nowExpense = expenditure.innerText;
  let parentAmount = parentDiv.querySelector(".amount").innerText;
  if (edit) {
    let parentText = parentDiv.querySelector(".product").innerText;
    productName.value = parentText;
    productCost.value = parentAmount;
  }
  balance.innerText = parseInt(nowBalance) + parseInt(parentAmount);
  expenditure.innerText = parseInt(nowExpense) - parseInt(parentAmount);
  parentDiv.remove();
};

const listCreate = (expenseName, expenseValue) => {
  let listContent = document.createElement("div");
  listContent.classList.add("list-content", "flex-space");
  list.appendChild(listContent);
  listContent.innerHTML = `<p class="product">${expenseName}</p><p class="amount">${expenseValue}</p>`;
  let editBtn = document.createElement("button");
  editBtn.classList.add("fa-solid", "fa-pen-to-square", "edit");
  editBtn.style.fontSize = "1.3rem";
  editBtn.addEventListener("click", () => {
    modifyItem(editBtn, true);
  });
  let deleteBtn = document.createElement("button");
  deleteBtn.classList.add("fa-solid", "fa-trash-can", "delete");
  deleteBtn.style.fontSize = "1.3rem";
  deleteBtn.addEventListener("click", () => {
    modifyItem(deleteBtn);
  });
  listContent.appendChild(editBtn);
  listContent.appendChild(deleteBtn);
  document.getElementById("list").appendChild(listContent);
};

addAmount.addEventListener("click", () => {
  let expenditures = parseInt(productCost.value);
  let sumAll = parseInt(expenditure.innerText) + expenditures;
  expenditure.innerText = sumAll;
  const endBalance = tempAmount - sumAll;
  balance.innerText = endBalance;
  listCreate(productName.value, productCost.value);
  productName.value = "";
  productCost.value = "";
});