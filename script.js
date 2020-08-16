const calculatorDisplay = document.querySelector('h1');
const inputBtns = document.querySelectorAll('button');
const clearBtn = document.getElementById('clear-btn');

const calculate = {
    '/': (firstNumber, secondNumber) => firstNumber / secondNumber,

    '*': (firstNumber, secondNumber) => firstNumber * secondNumber,

    '+': (firstNumber, secondNumber) => firstNumber + secondNumber,

    '-': (firstNumber, secondNumber) => firstNumber - secondNumber,

    '=': (firstNumber, secondNumber) => secondNumber,
};

let firstValue = 0;
let operatorValue = '';
let nextValue = false;

function displayNumber(number) {
    if (nextValue) {
        calculatorDisplay.textContent = number;
        nextValue = false;
    } else {
        const numberValue = calculatorDisplay.textContent;
        calculatorDisplay.textContent = numberValue === '0' ? number : numberValue + number;
    }
}  

function useOperator(operator) {
    const currentValue = Number(calculatorDisplay.textContent);
    if (operatorValue && nextValue) {
        operatorValue = operator;
        return;
    }
    if (!firstValue) {
        firstValue = currentValue;
    } else {
        console.log(firstValue, operatorValue, currentValue);
        const calculation = calculate[operatorValue](firstValue, currentValue);
        console.log('calculation', calculation);
        calculatorDisplay.textContent = calculation;
        firstValue = calculation;
    }

    nextValue = true;
    operatorValue = operator;
}

function decimalPoint() {
    if (nextValue) return;
    if (!calculatorDisplay.textContent.includes('.')) {
        calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
    }
}

//reset all value, display
function clearAll() {
    firstValue = 0;
    operatorValue = '';
    nextValue = false;
    calculatorDisplay.textContent = '0';
}

//EventListeners
inputBtns.forEach((inputBtn) => {
    if (inputBtn.classList.length === 0) {
        inputBtn.addEventListener('click', () => displayNumber(inputBtn.value));
    } else if (inputBtn.classList.contains('operator')) {
        inputBtn.addEventListener('click', () => useOperator(inputBtn.value));
    } else if (inputBtn.classList.contains('decimal')) {
        inputBtn.addEventListener('click', () => decimalPoint());
    }
});

clearBtn.addEventListener('click', clearAll);