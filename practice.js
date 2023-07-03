const buttons = document.querySelectorAll('.calculator button');
const inputBox = document.getElementById('inputBox');
const math = mathjs();

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.textContent;
    const isOperator = value === '+' || value === '-' || value === '*' || value === '/';

    if (!isOperator || inputBox.value === '') {
      inputBox.value += value;
    }
  });
});

const clearButton = document.getElementById('clearButton');
clearButton.addEventListener('click', () => {
  inputBox.value = '';
});

const equalsButton = document.getElementById('equalsButton');
equalsButton.addEventListener('click', () => {
  try {
    const expression = inputBox.value;
    const result = math.evaluate(expression);
    inputBox.value = result;
  } catch (error) {
    inputBox.value = 'Error';
  }
});

