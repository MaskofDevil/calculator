// SECTION - Title Bar
document.getElementById('close').addEventListener('click', window.close)

document.getElementById('minimize').addEventListener('click', async () => {
    await window.min()
})

// SECTION - Copy to Clipboard
const clipboard = document.getElementById('clipboard')

clipboard.addEventListener('click', () => {
    navigator.clipboard.writeText(display.innerText)
})

// SECTION - Theme Toggle
document.getElementById('toggle-dark-mode').addEventListener('click', async () => {
    const isDarkMode = await window.darkMode.toggle()
    document.getElementById('theme-source').innerHTML = isDarkMode ? 'Dark' : 'Light'
})

// SECTION - Calculator Functionalities
const display = document.getElementById('display')
const numbers = document.querySelectorAll('[data-number]')
const operations = document.querySelectorAll('[data-operation]')
const brackets = document.querySelectorAll('[data-brackets]')[0]
const cancel = document.getElementsByClassName('cancel')[1]
const backspace = document.querySelectorAll('[data-backspace]')[0]
const equal = document.getElementsByClassName('equal')[0]

// NOTE - Numbers
for (let i = 0; i < numbers.length; i++) {
    numbers[i].addEventListener('click', () => {
        display.innerText += numbers[i].innerText
    })
}

// NOTE - Plus, Minus, Multiply, Divide, Decimal Point, Percentage
for (let i = 0; i < operations.length; i++) {
    operations[i].addEventListener('click', () => {
        display.innerText += operations[i].innerText
    })
}

// NOTE - Brackets
let leftBracket = false
function setBrackets() {
    let b
    if (!leftBracket) {
        b = '('
    } else {
        b = ')'
    }
    leftBracket = !leftBracket
    display.innerText += b
}

brackets.addEventListener('click', setBrackets)

// NOTE - Cancel
function clearDisplay() {
    display.innerText = ''
}

cancel.addEventListener('click', clearDisplay)

// NOTE - Backspace
function removeLastChar() {
    let s = display.innerText
    display.innerText = display.innerText.slice(0, s.length - 1)
}

backspace.addEventListener('click', removeLastChar)

// NOTE - Equal
function getResult() {
    let equation = display.innerHTML
    equation = equation.replace(/×/g, '*')
    equation = equation.replace(/÷/g, '/')
    equation = equation.replace(/%/g, '/100')
    // equation = equation.replace(/∞/g, '')

    if (!(equation === '')) {
        if (eval(equation) === Infinity) {
            display.innerText = '∞'
        } else if (eval(equation) === -Infinity) {
            display.innerText = '-∞'
        } else {
            display.innerText = eval(equation)
        }
    }
}

equal.addEventListener('click', getResult)

// SECTION - Keypress Functionality
document.addEventListener('keydown', (event) => {
    const num = Array.from(document.querySelectorAll('[data-number]')).map(x => x.innerText)

    const op = Array.from(document.querySelectorAll('[data-operation]')).map(x => x.innerText)
    op[1] = '/'
    op[2] = '*'

    if (num.includes(event.key)) {
        display.innerText += event.key
    }

    if (op.includes(event.key)) {
        if (event.key === '*') {
            display.innerText += '×'
        } else if (event.key === '/') {
            display.innerText += '÷'
        } else {
            display.innerText += event.key
        }
    }

    if (event.key === 'Enter' || event.key === '=') {
        getResult()
    }

    if (event.key === 'Backspace') {
        removeLastChar()
    }

    if (event.key === 'Escape') {
        clearDisplay()
    }

    // console.log(event.key)
    if (event.key === '(' || event.key === ')') {
        display.innerText += event.key
    }
})