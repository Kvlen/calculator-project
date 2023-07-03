// const buttons = document.querySelectorAll('.calculator button');
// const inputBox = document.getElementById('inputBox');
// const math = require('mathjs');

// buttons.forEach(button => {
//   button.addEventListener('click', () => {
//     const value = button.textContent;
    
//     // Check if the clicked button is an operator
//     const isOperator = value === '+' || value === '-' || value === '*' || value === '/';
    
//     // Get the current value in the input box
//     const currentValue = inputBox.value;
    
//     // Append the value to the input box only if it's not an operator
//     if (!isOperator || currentValue === '') {
//       inputBox.value += value;
//     }
//   });
// });

// const clearButton = document.getElementById('clearButton');
// clearButton.addEventListener('click', () => {
//   inputBox.value = '';
// });

// const equalsButton = document.getElementById('equalsButton');
// equalsButton.addEventListener('click', () => {
//   const expression = inputBox.value;
//   const result = evaluateExpression(expression);
//   inputBox.value = result;
// });

// function evaluateExpression(expression) {
//   try {
//     const result = math.evaluate(expression);
//     return result;
//   } catch (error) {
//     return 'Error';
//   }
// }

// // Function to append a value to the input box
// function appendToInput(value) {
//     var inputBox = document.getElementById("inputBox");
//     inputBox.value += value;
//   }
  
//   // Function to clear the input box
//   function clearInput() {
//     var inputBox = document.getElementById("inputBox");
//     inputBox.value = "";
//   }
  
//   // Function to perform the calculation
//   function calculate() {
//     var inputBox = document.getElementById("inputBox");
//     var result = math.evaluate(inputBox.value);
  
//     // Display the result
//     inputBox.value = result;
//   }
  
//   // Add event listeners to the number buttons
//   var numberButtons = document.getElementsByClassName("number");
//   for (var i = 0; i < numberButtons.length; i++) {
//     numberButtons[i].addEventListener("click", function () {
//       var value = this.textContent;
//       appendToInput(value);
//     });
//   }
  
//   // Add event listener to the clear button
//   var clearButton = document.getElementById("clearButton");
//   clearButton.addEventListener("click", clearInput);
  
//   // Add event listener to the equals button
//   var equalsButton = document.getElementById("equalsButton");
//   equalsButton.addEventListener("click", calculate);

// Variables to keep track of the state
var inputBox = document.getElementById('inputBox'); // input/output box
var numberButtons = document.getElementsByClassName('number'); // number buttons
var operatorButtons = document.getElementsByClassName('operator'); // operator buttons
var equalsButton = document.getElementById('equalsButton'); // equal button
var clearButton = document.getElementById('clearButton'); // clear button
var resultDisplayed = false; // flag to keep track of the result display

// Adding click handlers to number buttons
for (var i = 0; i < numberButtons.length; i++) {
  numberButtons[i].addEventListener('click', function(e) {
    var currentString = inputBox.value;
    var lastChar = currentString[currentString.length - 1];

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

// Adding click handlers to operator buttons
for (var i = 0; i < operatorButtons.length; i++) {
  operatorButtons[i].addEventListener('click', function(e) {
    var currentString = inputBox.value;
    var lastChar = currentString[currentString.length - 1];

    if (
      lastChar === '+' ||
      lastChar === '-' ||
      lastChar === '*' ||
      lastChar === '/'
    ) {
      var newString = currentString.substring(0, currentString.length - 1) + e.target.textContent;
      inputBox.value = newString;
    } else if (currentString.length == 0) {
      console.log('Enter a number first');
    } else {
      inputBox.value += e.target.textContent;
    }
  });
}

// Function to clear the input box
function clearInput() {
  inputBox.value = '';
}

// Function to perform addition, subtraction, multiplication, and division
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
  return num2; // Return num2 by default if the operator is not recognized
}

// Function to perform multiplication
function multiply(num1, num2) {
  return num1 * num2;
}

// Function to perform division
function divide(num1, num2) {
  return num1 / num2;
}

// Function to perform the calculation
function calculate() {
  var inputString = inputBox.value;
  var numbers = inputString.split(/\+|\-|\*|\//g);
  var operators = [];

  // Extract the operators from the input string
  for (var i = 0; i < inputString.length; i++) {
    if (inputString[i] === '+' || inputString[i] === '-' || inputString[i] === '*' || inputString[i] === '/') {
      operators.push(inputString[i]);
    }
  }

  var currentResult = parseFloat(numbers[0]); // Initialize current result with the first number

  for (var i = 0; i < operators.length; i++) {
    var operator = operators[i];
    var nextNumber = parseFloat(numbers[i + 1]);

    if (operator === '*') {
      currentResult = multiply(currentResult, nextNumber); // Use multiply function for multiplication
    } else if (operator === '/') {
      currentResult = divide(currentResult, nextNumber); // Use divide function for division
    } else {
      currentResult = performOperation(currentResult, operator, nextNumber); // Use performOperation for addition and subtraction
    }
  }

  inputBox.value = currentResult; // Display the final result
  resultDisplayed = true;
}

// Add event listeners to the clear button
clearButton.addEventListener('click', clearInput);

// Add event listener to the equals button
equalsButton.addEventListener('click', calculate);




