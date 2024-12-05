
let display = document.getElementById("display");
let currentInput = "0";
let operator = null;
let firstOperand = null;
let awaitingSecondOperand = false;

function updateDisplay() {
    display.textContent = currentInput;
}

function clearDisplay() {
    currentInput = "0";
    operator = null;
    firstOperand = null;
    awaitingSecondOperand = false;
    updateDisplay();
}

function deleteLast() {
    if (currentInput.length > 1) {
        currentInput = currentInput.slice(0, -1);
    } else {
        currentInput = "0";
    }
    updateDisplay();
}

function appendNumber(number) {
    if (awaitingSecondOperand) {
        currentInput = number;
        awaitingSecondOperand = false;
    } else {
        if (currentInput === "0" && number !== ".") {
            currentInput = number;
        } else {
            currentInput += number;
        }
    }
    updateDisplay();
}

function appendDecimal() {
    if (!currentInput.includes(".")) {
        currentInput += ".";
    }
    updateDisplay();
}

function appendOperator(op) {
    if (operator && awaitingSecondOperand) {
        operator = op;
        return;
    }

    if (firstOperand === null) {
        firstOperand = parseFloat(currentInput);
    } else if (operator) {
        calculate();
    }

    operator = op;
    awaitingSecondOperand = true;

    display.textContent = firstOperand + " " + operator;
}

function calculate() {
    if (operator && firstOperand !== null) {
        let result;
        const secondOperand = parseFloat(currentInput);

        if (operator === "/" && secondOperand === 0) {
            currentInput = "Error";
            operator = null;
            firstOperand = null;
            updateDisplay();
            return;
        }
   
        switch (operator) {
            case "+":
                result = firstOperand + secondOperand;
                break;
            case "-":
                result = firstOperand - secondOperand;
                break;
            case "*":
                result = firstOperand * secondOperand;
                break;
            case "/":
                result = firstOperand / secondOperand;
                break;
            default:
                return;
        }

        currentInput = result.toString();
        operator = null;
        firstOperand = null;
        awaitingSecondOperand = false;
        updateDisplay();
    }
}

document.querySelectorAll(".number").forEach(button => {
    button.addEventListener("click", () => appendNumber(button.textContent));
});

document.querySelector(".decimal").addEventListener("click", appendDecimal);

document.querySelectorAll(".operator").forEach(button => {
    button.addEventListener("click", () => {
        const op = button.textContent;
        if (op === "÷") {
            appendOperator("/");
        } else if (op === "×") {
            appendOperator("*");
        } else if (op === "−") {  
            appendOperator("-");
        } else {
            appendOperator(op);
        }
    });
});

document.querySelector(".clear").addEventListener("click", clearDisplay);

document.querySelector(".delete").addEventListener("click", deleteLast);

document.querySelector(".equal").addEventListener("click", calculate);
