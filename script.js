// HTML element variables
var menu = document.getElementById("dice-menu");
var rollBtn = document.getElementById("roll-btn");
var resetBtn = document.getElementById("reset-btn");
var rollHistory = document.getElementById("roll-history");
var rollSum = document.getElementById("roll-sum");
var dice1 = document.getElementById("dice-1");
var dice2 = document.getElementById("dice-2");

// Global variables for dice rotation
var angle1 = 0;
var angle2 = 0;
var timer1;
var timer2;
let randNum1;
let randNum2;

// Event Listeners
rollBtn.addEventListener("click", typesDiceActions);
resetBtn.addEventListener("click", resetClicked);

// Function to animate dice
function animateDice(dice, angle) {
  return function () {
    angle += 10; // Increase the angle for rotation
    dice.style.transform = `rotate(${angle}deg)`;
  };
}

// Functions to start animation
function startDiceAnimation() {
  timer1 = setInterval(animateDice(dice1, angle1), 50); // Rotate every 50ms
  timer2 = setInterval(animateDice(dice2, angle2), 50); // Rotate every 50ms
}

// Function to stop animation
function stopDiceAnimation() {
  clearInterval(timer1);
  clearInterval(timer2);
}

// Function to roll dice and update history
function rollDice() {
  stopDiceAnimation(); // Stop any ongoing animation

  randNum1 = Math.floor(Math.random() * 6) + 1;
  randNum2 = Math.floor(Math.random() * 6) + 1;

  dice1.src = `images/${randNum1}.png`;
  dice2.src = `images/${randNum2}.png`;

  // Check for BINGO
  if (randNum1 + randNum2 === 12) {
    alert("BINGO!");
  }

  // Display roll history
  var result = document.createElement("span");
  result.textContent = `${randNum1} - ${randNum2}`;
  rollHistory.appendChild(result);

  // Display sum directly after rolling
  let sum = randNum1 + randNum2;
  var sumDisplay = document.createElement("span");
  sumDisplay.textContent = `${randNum1} + ${randNum2} = ${sum}`;
  rollSum.appendChild(sumDisplay);

  startDiceAnimation(); // Start animation after rolling
}

// Different other functions
function typesDiceActions() {
  var selectOption = menu.value; // Select option

  if (selectOption === "roll-1") {
    rollDice();
  } else if (selectOption === "roll-5") {
    for (let i = 1; i <= 5; i++) {
      rollDice();
    }
  } else if (selectOption === "roll-x") {
    var rolls = prompt("Enter the number of rolls:");
    var rollCount = parseInt(rolls, 10);
    if (!isNaN(rollCount)) {
      for (let i = 1; i <= rollCount; i++) {
        rollDice();
      }
    } else {
      alert("Please enter a valid number.");
    }
  } else if (selectOption === "roll-snake") {
    let countNum = 0;
    while (true) {
      rollDice();
      countNum++;
      if (randNum1 === 1 && randNum2 === 1) {
        break;
      }
      alert(countNum);
    }
  } else {
    alert("Please select a valid option.");
  }
}

// Reload
function resetClicked() {
  location.reload();
}
