let numberOfRows = 16;
let currentColor = 'blue';
let isKeyDown = 0;
let arrayData = [];
let storageOn = 0;
if (localStorage.getItem('divData')) {
    arrayData = localStorage.getItem('divData').split('|');
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
                localStorage.setItem('divData',arrayData.join('|'));
            }
            newParentDiv.appendChild(newDiv);
        }
        container.appendChild(newParentDiv);
    }
    addHover(currentColor);
}

function addHover(color) {
    currentColor = color;
    const item = document.querySelectorAll(".item");
    for (const [index, each] of item.entries()) {
        each.addEventListener('mouseover', () => {
            if (color == 'rainbow') {
                let r = Math.floor(Math.random()*256)
                let g = Math.floor(Math.random()*256)
                let b = Math.floor(Math.random()*256)
                each.style.backgroundColor = `rgb(${r}, ${g}, ${b}`
                editArrayDataColor(index, `rgb(${r}, ${g}, ${b}`);
            } else {
                each.style.backgroundColor = color
                editArrayDataColor(index, color);
            }
        })
    }
}

function editArrayDataColor(index, color) {
    arrayData[index] = color;
    localStorage.setItem('divData',arrayData.join('|'))
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
    const colorPickerButton = document.querySelector('#colorpicker')
    const blueButton = document.querySelector('#bluebutton')
    const redButton = document.querySelector('#redbutton')
    const greenButton = document.querySelector('#greenbutton')
    const rainbowButton = document.querySelector('#rainbowbutton')
    blueButton.addEventListener('click', () =>{
        addHover('blue');
        currentColor = 'blue';
        colorPickerButton.value = '#0000FF'
    })
    redButton.addEventListener('click', () =>{
        addHover('red');
        currentColor = 'red';
        colorPickerButton.value = '#FF0000'
    })
    greenButton.addEventListener('click', () =>{
        addHover('green')
        currentColor = 'green';
        colorPickerButton.value = '#008000'
    })
    rainbowButton.addEventListener('click', () =>{
        addHover('rainbow');
        currentColor = 'rainbow';
        colorPickerButton.value = '#ee82ee'
    })
    colorPickerButton.addEventListener('input', () =>{
        addHover(colorPickerButton.value);
        currentColor = colorPickerButton.value;
    })
}

function createEraser() {
    document.addEventListener('keydown', (event) => {
        if (event.code == 'Space' && isKeyDown == 0) {
            savedColor = currentColor;
            addHover('white');
            isKeyDown = 1;
        }
    })
    document.addEventListener('keyup', (event) => {
        if (event.code == 'Space') {
            addHover(savedColor);
            isKeyDown = 0;
        }
    })
}