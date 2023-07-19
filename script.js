let numberOfRows = 16;
let currentColor = 'blue';

window.onload = () => {
    createDivs();
    buttonFunc();
    colorButtons();
    eraser();
}

function createDivs() {
    for (let i = 0; i < numberOfRows; i++) {
        const container = document.querySelector(".mastercontainer");
        const newParentDiv = document.createElement("div");
        newParentDiv.classList.add('item-container');
        for (let i = 0; i < numberOfRows; i++) {
            const newDiv = document.createElement("div");
            newDiv.classList.add('item');
            newParentDiv.appendChild(newDiv);
        }
        container.appendChild(newParentDiv);
    }
    addHover('blue');
}

function addHover(color) {
    currentColor = color;
    const item = document.querySelectorAll(".item");
    for (const each of item) {
        each.addEventListener('mouseover', () => {
            each.style.backgroundColor = color
        })
        // each.addEventListener('mouseout', () => {
        //     each.style.backgroundColor = 'white'
        // })
    }
}

function buttonFunc() {
    const button = document.querySelector("button");
    button.addEventListener('click', () => {
        numberOfRows = parseInt(prompt("Please enter your desired number of rows", "16"))
        const container = document.querySelector(".mastercontainer");
        container.innerHTML = ""
        createDivs();
    })
}

function colorButtons() {
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

function eraser() {
    document.addEventListener('keydown', (event) => {
        let savedColor = currentColor;
        console.log(savedColor);
        if (event.code == 'Space') addHover('white');
    })
    document.addEventListener('keyup', (event) => {
        if (event.code == 'Space') addHover(savedColor);
    })
}