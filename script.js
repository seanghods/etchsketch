let numberOfRows = 16

createDivs();
buttonFunc();
colorButtons();

function createDivs(x = 1) {
    for (let i = 0; i < numberOfRows; i++) {
        const container = document.querySelector(".mastercontainer");
        const newParentDiv = document.createElement("div");
        newParentDiv.classList.add('item-container');
        for (let i = 0; i < numberOfRows; i++) {
            const newDiv = document.createElement("div");
            newDiv.classList.add('item');
            newDiv.innerHTML = 'X';
            x++;
            if (x == numberOfRows + 1) x = 1;
            newParentDiv.appendChild(newDiv);
        }
        container.appendChild(newParentDiv);
    }
    addHover('blue');
}

function addHover(color) {
    const item = document.querySelectorAll(".item")
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