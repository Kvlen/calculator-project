let inputBox = document.getElementById('inputBox');
let numberButtons = document.getElementsByClassName('number');
let operatorButtons = document.getElementsByClassName('operator');
let equalsButton = document.getElementById('equalsButton');
let clearButton = document.getElementById('clearButton');
let resultDisplayed = false;

for (let i = 0; i < numberButtons.length; i++) {
  numberButtons[i].addEventListener('click', function(e) {
    let currentString = inputBox.value;
    let lastChar = currentString[currentString.length - 1];

    if (resultDisplayed === false) {
      inputBox.value += e.target.textContent;
    } else if (
      resultDisplayed === true &&
      (lastChar === '+' || lastChar === '-' || lastChar === '*' || lastChar === '/')
    ) {
      resultDisplayed = false;
      inputBox.value += e.target.textContent;
    } else {
      resultDisplayed = false;
      inputBox.value = '';
      inputBox.value += e.target.textContent;
    }
  });
}

for (let i = 0; i < operatorButtons.length; i++) {
  operatorButtons[i].addEventListener('click', function(e) {
    let currentString = inputBox.value;
    let lastChar = currentString[currentString.length - 1];

    let operator = e.target.textContent;

    // Handle the conversion from "÷" to "/"
    if (operator === '÷') {
      operator = '/';
    }

    if (
      lastChar === '+' ||
      lastChar === '-' ||
      lastChar === '*' ||
      lastChar === '/'
    ) {
      let newString = currentString.substring(0, currentString.length - 1) + operator;
      inputBox.value = newString;
    } else if (currentString.length === 0) {
      console.log('Enter a number first');
    } else {
      inputBox.value += operator;
    }
  });
}

function clearInput() {
  inputBox.value = '';
}

function performOperation(num1, operator, num2) {
  if (operator === '+') {
    return num1 + num2;
  } else if (operator === '-') {
    return num1 - num2;
  } else if (operator === '*') {
    return multiply(num1, num2);
  } else if (operator === '/') {
    return divide(num1, num2);
  }
  return num1;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  if (num2 === 0) {
    return "Error: Division by zero";
  }
  return num1 / num2;
}

function calculate() {
  let inputString = inputBox.value;
  let numbers = inputString.split(/(?<=[0-9])[\+\-\*\/](?=[0-9])/g);
  let operators = inputString.replace(/[0-9]|\./g, '').split('');

  let currentResult = parseInt(numbers[0], 10);

  for (let i = 0; i < operators.length; i++) {
    let operator = operators[i];
    let nextNumber = parseInt(numbers[i + 1], 10);

    if (operator === '*') {
      currentResult = multiply(currentResult, nextNumber);
    } else if (operator === '/') {
      currentResult = divide(currentResult, nextNumber);
    } else {
      currentResult = performOperation(currentResult, operator, nextNumber);
    }
  }

  inputBox.value = currentResult;
  resultDisplayed = true;
}

clearButton.addEventListener('click', clearInput);
equalsButton.addEventListener('click', calculate);
