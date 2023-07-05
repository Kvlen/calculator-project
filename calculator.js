let inputBox = document.getElementById('inputBox');
let numberButtons = document.getElementsByClassName('number');
let operatorButtons = document.getElementsByClassName('operator');
let equalsButton = document.getElementById('equalsButton');
let clearButton = document.getElementById('clearButton');
let resultDisplayed = false;

// for loop that adds event listeners to the number buttons.
for (let i = 0; i < numberButtons.length; i++) {
  // When a number button is clicked, it triggers a function that checks if the result is currently displayed.
  // If not, it appends the clicked number to the input box value.
  numberButtons[i].addEventListener('click', function(e) {
    let currentString = inputBox.value;
    let mathChar = currentString[currentString.length - 1];
     
    // If the result is displayed and the last character in the input box is an operator (+, -, *, or /),
    // it appends the clicked number to the input box value.
    if (resultDisplayed === false) {
      inputBox.value += e.target.textContent;
    } else if (
      resultDisplayed === true &&
      (mathChar === '+' || mathChar === '-' || mathChar === '*' || mathChar === '/')
    ) {
      resultDisplayed = false;
      inputBox.value += e.target.textContent;
    // Otherwise, it clears the input box and sets it to the clicked number.
    } else {
      resultDisplayed = false;
      inputBox.value = '';
      inputBox.value += e.target.textContent;
    }
  });
}

// for loop adds event listeners to the operator buttons. 
for (let i = 0; i < operatorButtons.length; i++) {
  // Checks when an operator button is clicked, it triggers a function.
  operatorButtons[i].addEventListener('click', function(e) {
    let currentString = inputBox.value;
    let mathChar = currentString[currentString.length - 1];

    let operator = e.target.textContent;

    // Handle the conversion from "÷" to "/"
    if (operator === '÷') {
      operator = '/';
    }

    // this gets the current string from the input box and checks the last character
    //  It also retrieves the text content of the clicked operator button.
    if (
      mathChar === '+' ||
      mathChar === '-' ||
      mathChar === '*' ||
      mathChar === '/'
    ) {
      // removes the last character from the currentString and replaces it with the operator
      // Then enters new operator that was clicked
      let newString = currentString.substring(0, currentString.length - 1) + operator;
      inputBox.value = newString;
    } else if (currentString.length === 0) {
      console.log('Enter a number first');
    } else {
      inputBox.value += operator;
    }
  });
}

// clears the input box by setting its value to an empty string
function clearInput() {
  inputBox.value = '';
}

// takes three parameters, based on the operator, it performs the 
// corresponding mathematical operation and returns the result.
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

// function multiplies two numbers and returns the result
function multiply(num1, num2) {
  return num1 * num2;
}

// function divides two numbers. If the divisor is 0, it returns an error message. 
// Otherwise, it returns the division result
function divide(num1, num2) {
  if (num2 === 0) {
    return "Error: Division by zero";
  }
  return num1 / num2;
}

// function is triggered when the equals button is clicked
function calculate() {
  // retrieves the input string from the input box
  let inputString = inputBox.value; 
  // splits it into an array of numbers and operators using a regular expression
  let numbers = inputString.split(/(?<=[0-9])[\+\-\*\/](?=[0-9])/g);
  // also creates an array of operators by replacing all digits and dots from the input string
  let operators = inputString.replace(/[0-9]|\./g, '').split('');

  // converts the first element to an integer using the parseInt function. 
  // The parseInt function parses a string argument and returns an integer. 
  // The second argument 10 specifies that the string should be interpreted as a decimal number.
  let currentResult = parseInt(numbers[0], 10);

  // iterates over the operators array and performs the corresponding operation based on the operator
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

  // contains the final result 
  inputBox.value = currentResult;
  resultDisplayed = true;
}

clearButton.addEventListener('click', clearInput);
equalsButton.addEventListener('click', calculate);
