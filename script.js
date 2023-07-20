let numberOfRows = 16;
let currentColor = 'blue';
let arrayData = [];
let storageOn = 0;
if (localStorage.getItem('divData')) {
    arrayData = localStorage.getItem('divData').split(',');
    storageOn = 1;
}

window.onload = () => {
    createDivs();
    buttonFunc();
    createColorButtons();
    createEraser();
}



function createDivs() {
    let counter = -1;
    if (storageOn) numberOfRows = Math.sqrt(arrayData.length)
    for (let i = 0; i < numberOfRows; i++) {
        const container = document.querySelector(".mastercontainer");
        const newParentDiv = document.createElement("div");
        newParentDiv.classList.add('item-container');
        for (let j = 0; j < numberOfRows; j++) {
            const newDiv = document.createElement("div");
            counter++;
            newDiv.classList.add('item');
            if (storageOn) {
                newDiv.style.backgroundColor = arrayData[counter]
            } else {
                newDiv.style.backgroundColor = 'white'
                arrayData.push('white');
                localStorage.setItem('divData',arrayData.join(','));
            }
            newParentDiv.appendChild(newDiv);
        }
        container.appendChild(newParentDiv);
    }
    addHover('blue');
}

function addHover(color) {
    currentColor = color;
    const item = document.querySelectorAll(".item");
    for (const [index, each] of item.entries()) {
        each.addEventListener('mouseover', () => {
            each.style.backgroundColor = color
            editArrayDataColor(index, color);
        })
    }
}

function editArrayDataColor(index, color) {
    arrayData[index] = color;
    localStorage.setItem('divData',arrayData.join(','))
}

function buttonFunc() {
    const button = document.querySelector("button");
    button.addEventListener('click', () => {
        numberOfRows = parseInt(prompt("Please enter your desired number of rows", "16"))
        if (numberOfRows > 50) numberOfRows = 50;
        const container = document.querySelector(".mastercontainer");
        container.innerHTML = "";
        storageOn = 0;
        arrayData = [];
        createDivs();
    })
}

function createColorButtons() {
    const blueButton = document.querySelector('#bluebutton')
    blueButton.addEventListener('click', () =>{
        addHover('blue')
    })
    const redButton = document.querySelector('#redbutton')
    redButton.addEventListener('click', () =>{
        addHover('red')
    })
    const greenButton = document.querySelector('#greenbutton')
    greenButton.addEventListener('click', () =>{
        addHover('green')
    })
}

function createEraser() {
    document.addEventListener('keydown', (event) => {
        let savedColor = currentColor;
        if (event.code == 'Space') addHover('white');
    })
    document.addEventListener('keyup', (event) => {
        if (event.code == 'Space') addHover(savedColor);
    })
}