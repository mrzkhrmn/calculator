// get calculatordisplay buttons and clearbutton
const calculatorDisplay = document.querySelector("h1");
const inputButtons = document.querySelectorAll("button");
const clearButton = document.getElementById("clear-btn");

let firstValue = 0;
let operatorValue = "";
let awaitingNextValue = false;

//send number value function
function sendNumberValue(number) {
    if(awaitingNextValue) {
        calculatorDisplay.textContent = number;
        awaitingNextValue = false;
    }else {
        const displayValue = calculatorDisplay.textContent;
        calculatorDisplay.textContent = displayValue === "0" ? number : displayValue + number;
    }
}

function addDecimal() {
    if(awaitingNextValue) return;
    if(!calculatorDisplay.textContent.includes(".")) {
        calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
    }
}

const calculate = {
    "/": (firstNumber, secondNumber) => firstNumber / secondNumber,

    "*": (firstNumber, secondNumber) => firstNumber * secondNumber,

    "+": (firstNumber, secondNumber) => firstNumber + secondNumber,

    "-": (firstNumber, secondNumber) => firstNumber - secondNumber,

    "=": (firstNumber, secondNumber) => secondNumber,
}

//Add event listeners for numbers operators decimal buttons with classlist
inputButtons.forEach((inputButton) => {
    if(inputButton.classList.length === 0) {
        inputButton.addEventListener("click", () => sendNumberValue(inputButton.value));
    }
    else if(inputButton.classList.contains("operator")) {
        inputButton.addEventListener("click", () => useOperator(inputButton.value));
    }

    else if(inputButton.classList.contains("decimal")) {
        inputButton.addEventListener("click", () => addDecimal());
    }
})

function useOperator(operator) {
    const currentValue = Number(calculatorDisplay.textContent);
    if(operatorValue && awaitingNextValue) {
        operatorValue = operator;
        return;
    }

    if (!firstValue) {
        firstValue = currentValue;
    }else {
        console.log(firstValue, operatorValue,  currentValue);
        const calculation = calculate[operatorValue](firstValue, currentValue);
        calculatorDisplay.textContent = calculation;
        console.log(calculation);
        firstValue = calculation;
    }
    awaitingNextValue = true;
    operatorValue = operator;
}

function resetDisplay() {
    calculatorDisplay.textContent = "0";
    operatorValue = "";
    awaitingNextValue = false;
    firstValue = 0;
}

clearButton.addEventListener("click", resetDisplay);