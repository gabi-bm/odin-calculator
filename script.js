const operationScreen = document.querySelector('#operation-screen');
const resultScreen = document.querySelector('#result-screen');
const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const equal = document.querySelector('#equal');
const pointBtn = document.querySelector('.point');
const clearBtn = document.querySelector('.clear');
const deleteBtn = document.querySelector('.delete');
const ansBtn = document.querySelector('.ans');

const regExpOperators = /[+]|[-]|[/]|[x]/;

let lastActionOperation = false;
let ans = 0;

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

const operate = function (operator, a, b) {
    a = parseFloat(a);
    b = parseFloat(b);
    switch (operator) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case 'x':
            return multiply(a, b);
        case '/':
            return divide(a, b);
    }
}

function doTheMath(e) {
    let operator = operationScreen.textContent.slice(1).match(regExpOperators).toString();
    let index = operationScreen.textContent.slice(1).indexOf(operator) + 1;
    let a = operationScreen.textContent.slice(0, index);
    let b = operationScreen.textContent.slice(index + 1);
    resultScreen.textContent = parseFloat(operate(operator, a, b).toFixed(2));
    ans = operate(operator, a, b);
    lastActionOperation = true;
}

function numberHandler(e) {
    if (operationScreen.textContent.length >= 14) return;
    if (lastActionOperation) {
        operationScreen.textContent = e.target.textContent;
        lastActionOperation = false;
    } else {
        operationScreen.textContent += e.target.textContent
    }
}

function operatorHandler(e) {
    if (operationScreen.textContent.length >= 14) return;
    if (!(regExpOperators.test(operationScreen.textContent)) || operationScreen.textContent.charAt(0) === '-') {
        operationScreen.textContent += e.target.textContent;
    } else {
        if (checkSyntax(operationScreen.textContent)) {
            doTheMath(e);
            operationScreen.textContent = resultScreen.textContent + e.target.textContent;
        } else {
            alertSyntaxError();
        }
    }    
    lastActionOperation = false;
}

function equalHandler(e) {
    if (!(regExpOperators.test(operationScreen.textContent.slice(1)))) {
            if (operationScreen.textContent.slice(0, 1) === '+'){
                resultScreen.textContent = operationScreen.textContent.slice(1);
            } else {
                resultScreen.textContent = operationScreen.textContent;
            }
    } else {
        (checkSyntax(operationScreen.textContent)) ? doTheMath(e) : alertSyntaxError();
    }
}

numbers.forEach((number) => number.addEventListener('click', numberHandler));
operators.forEach((operator) => operator.addEventListener('click', operatorHandler));
equal.addEventListener('click', equalHandler);

clearBtn.addEventListener('click', () => {
    operationScreen.textContent = '';
    resultScreen.textContent = '0';
    lastActionOperation = false;
});

deleteBtn.addEventListener('click', () => {
    operationScreen.textContent = operationScreen.textContent.slice(0, -1);
    lastActionOperation = false;
})

ansBtn.addEventListener('click', () => {
    if (lastActionOperation) {
        operationScreen.textContent = ans;
        lastActionOperation = false;
    } else {
        operationScreen.textContent += ans;
    }
})

pointBtn.addEventListener('click', (e) => {
    if (operationScreen.textContent.length >= 14) return;
    operationScreen.textContent += e.target.textContent
});

function checkSyntax(string) {
    return ((/[x]|[/]/).test(string.charAt(0)) || 
        (regExpOperators.test(operationScreen.textContent.charAt(operationScreen.textContent.length - 1)))) ? false 
        : true;
}

function alertSyntaxError () {
    operationScreen.textContent = '';
    resultScreen.textContent = 'Syntax ERROR';
}
