// Investment Accounts Start Code

// HTML Variables
let outputEl = document.getElementById("output");

// Global Variables
function rand_num() {
  let data = [];
  for (let i = 0; i < 50; i++) {
    data.push(Math.floor(Math.random() * 5000));
  }
  return data;
} // account data
let data = rand_num();
console.log(data);
let maxVal = 5000; // max data value

// Draw Array every 20ms
setInterval(drawDataArray, 20);

// Main Menu & Go Button
document.getElementById("go-btn").addEventListener("click", mainMenu);

function mainMenu() {
  // Get value of menu select element
  let selection = document.getElementById("menu-select").value;

  // Take action based on menu selection
  if (selection === "deposit") {
    deposit();
  } else if (selection === "withdrawal") {
    withdrawal();
  } else if (selection === "count") {
    countUnder2000();
  } else if (selection === "donor") {
    generousDonor();
  } else if (selection === "attack") {
    hackerAttack();
  }
}

// ******************************************************
// MENU SELECTION FUNCTIONS
// ******************************************************
function deposit() {
  // Prompt the user for the index of an account and the amount to deposit into that account.
  let index = +prompt("Plaese enter the index of your account:");
  let amount = +prompt("Please enter the amount you want to deposit:");
  // Modify the data array to reflect the deposit.
  data[index] += amount;
  console.log(data);
  // Adjust the maxVal variable if necessary.
  if (data[index] > maxVal) {
    maxVal = data[index];
    console.log(maxVal);
  }
  // Use the outputEl to provide a confirmation message.
  outputEl.innerHTML = `Deposit Successful! Current balance: $${data[index]}`;
}

function withdrawal() {
  // Prompt the user for the index of an account and the amount to withdraw from that account.
  let index = +prompt("Plaese enter the index of your account:");
  let amount = +prompt("Please enter the amount you want to Withdraw:");
  // Check to assure that the account has enough funds.
  if (amount > data[index]) {
    outputEl.innerHTML = "Not enough funds";
  } else {
    // Modify the data array to reflect the withdrawal.
    data[index] -= amount;
    console.log(data);
    // Use the outputEl to provide a confirmation message.
    let total = data[index] - amount;
    outputEl.innerHTML = `Withdrawal Successful!  Current balance: $${total}`;
  }
}

function countUnder2000() {
  // Count the number of accounts that are less than 2000
  let count = 0;
  for (let amount of data) {
    if (amount < 2000) {
      count++;
    }
  }
  // Use the outputEl to display the results of the count.
  outputEl.innerHTML = `${count} accounts are Under $2000`;
}

function generousDonor() {
  // A generous donor has decided to give $500 to every investment
  // account that has less than $2000.
  let count = 0;

  for (let i = 0; i < data.length; i++) {
    if (data[i] < 2000) {
      // Modify the data array to apply this donation.
      data[i] += 500;
      count++;
    }
  }
  console.log(data);
  // Use the outputEl to display the total amount of money that was donated.
  let total_donated = count * 500;
  outputEl.innerHTML = `Total amount of money donated: $${total_donated}`;
}

function hackerAttack() {
  // A hacker steals 5% from every account.
  let total_money = 0;
  for (let i = 0; i < data.length; i++) {
    let money_stolen = data[i] * 0.05;
    total_money += money_stolen;
    // Modify the data array to apply this theft.
    data[i] = data[i] - money_stolen;
  }

  console.log(data);
  // Use the outputEl to display the total amount that was stolen.
  outputEl.innerHTML = `Hacker Attack! $${total_money.toFixed(2)} was stolen`;
}

// ******************************************************
// END OF MENU SELECTION FUNCTIONS
// ******************************************************

// Function to draw current state of data array
function drawDataArray() {
  let outputStr = "";
  for (let val of data) {
    let divHeight = (val / maxVal) * 600; // Scale grades to fit in array visualizer container
    outputStr += `<div style="height:${divHeight}px"></div>`;
  }
  document.getElementById("container").innerHTML = outputStr;
}
