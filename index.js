let isAnyButtonActive = false;
let drawSquare;
let drawSquareOnHover;
let activeButton = null; // Variable to keep track of the currently active button

function createGrid(gridSize) {
    let itemWidth = 100 / gridSize;
    let itemHeight = 100 / gridSize;
    let grid = document.querySelector('.grid-container');

    for (let i = 0; i < gridSize * gridSize; i++) {
        let square = document.createElement('div');
        square.setAttribute('class', 'grid-item');
        square.style.width = `${itemWidth}%`;
        square.style.height = `${itemHeight}%`;
        grid.appendChild(square);
    }
}

function slider() {
    let height = document.querySelector('.gridHeight');
    let width = document.querySelector('.gridWidth');
    let sliderValue = document.querySelector('.slider');
    // show the initial height and width of the grid 
    height.textContent = `${sliderValue.getAttribute("value")}`;
    width.textContent = `${sliderValue.getAttribute("value")}`;

    // input manipulation
    sliderValue.addEventListener("input", (e) => {
        let grid = document.querySelector('.grid-container');

        // change the values of height and width and display them 
        height.textContent = `${e.target.value}`;
        width.textContent = `${e.target.value}`;

        // change number of squares inside the grid 
        grid.textContent = "";
        createGrid(e.target.value);
        draw();
        rainbowMode();
        eraser();
        lighter();
        shader();
        clearGrid();
        toggleGridLines();

        // making the smallest dimension of the grid 5*5
        if (e.target.value <= 5) {
            height.textContent = "5";
            width.textContent = "5";
            grid.textContent = "";
            createGrid(5);
            console.log("under 5");
        }
    });
}

function draw() {
    const squares = document.querySelectorAll('.grid-item');
    let isMouseDown = false;

    drawSquare = (e) => {
        let selectedColor = document.querySelector('#color-picker').value;
        e.target.style.backgroundColor = selectedColor;
    };

    drawSquareOnHover = (e) => {
        if (isMouseDown) {
            let selectedColor = document.querySelector('#color-picker').value;
            e.target.style.backgroundColor = selectedColor;
        }
    };

    function updateEventListeners() {
        squares.forEach((square) => {
            square.addEventListener('mousedown', () => {
                isMouseDown = true;
            });

            square.addEventListener('mouseup', () => {
                isMouseDown = false;
            });

            square.addEventListener('dragstart', (e) => {
                e.preventDefault();
                isMouseDown = false;
            });
        });
    }

    updateEventListeners();
    updateDrawFunction();
}

function disableOtherButtons(exceptButton) {
    const buttons = document.querySelectorAll('#rainbow-button, #eraser-button, #lighter-button, #shader-button');
    isAnyButtonActive = true;
    buttons.forEach(button => {
        if (button !== exceptButton) {
            button.disabled = true;
            button.style.backgroundColor = '#1B1A55';
            button.style.color = '#9290C3';
        } else {
            button.disabled = false;
            button.style.backgroundColor = '#9290C3';
            button.style.color = '#1B1A55';
        }
    });
    updateDrawFunction();
}

function enableAllButtons() {
    const buttons = document.querySelectorAll('#rainbow-button, #eraser-button, #lighter-button, #shader-button');
    isAnyButtonActive = false;
    buttons.forEach(button => {
        button.disabled = false;
        button.style.backgroundColor = '#1B1A55';
        button.style.color = '#9290C3';
    });
    updateDrawFunction();
}

function setActiveButton(button) {
    if (activeButton) {
        // Deactivate the previously active button
        activeButton.style.backgroundColor = '#1B1A55';
        activeButton.style.color = '#9290C3';
    }

    // Activate the new button
    button.style.backgroundColor = '#9290C3';
    button.style.color = '#1B1A55';
    activeButton = button;
}

function rainbowMode() {
    let rainbowButton = document.querySelector('#rainbow-button');
    let squares = document.querySelectorAll('.grid-item');
    let isClicked = false;

    rainbowButton.addEventListener('click', () => {
        isClicked = !isClicked;
        if (isClicked) {
            setActiveButton(rainbowButton);
            disableOtherButtons(rainbowButton);
        } else {
            enableAllButtons();
            activeButton = null;
        }
    });

    squares.forEach((square) => {
        square.addEventListener('mousedown', () => {
            isMouseDown = true;
        });

        square.addEventListener('mouseup', () => {
            isMouseDown = false;
        });

        square.addEventListener('mouseover', (e) => {
            if (isMouseDown && isClicked) {
                e.target.style.backgroundColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
            }
        });

        square.addEventListener('click', (e) => {
            if (isClicked) {
                e.target.style.backgroundColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
            }
        });
    });
}


function eraser() {
    let eraserButton = document.querySelector('#eraser-button');
    let squares = document.querySelectorAll('.grid-item');
    let isClicked = false;
    let isMouseDown = false;

    eraserButton.addEventListener('click', () => {
        isClicked = !isClicked;
        if (isClicked) {
            setActiveButton(eraserButton);
            disableOtherButtons(eraserButton);
        } else {
            enableAllButtons();
            activeButton = null;
        }
    });

    squares.forEach((square) => {
        square.addEventListener('mousedown', () => {
            isMouseDown = true;
        });

        square.addEventListener('mouseup', () => {
            isMouseDown = false;
        });

        square.addEventListener('mouseover', (e) => {
            if (isMouseDown && isClicked) {
                e.target.style.backgroundColor = `#fff`;
            }
        });

        square.addEventListener('click', (e) => {
            if (isClicked) {
                e.target.style.backgroundColor = `#fff`;
            }
        });
    });
}

function getLightenedColor(rgbString, increment) {
    let rgb = rgbString.match(/\d+/g).map(Number);
    let [r, g, b] = rgb;

    // Return white if color is already white
    if (r === 255 && g === 255 && b === 255) {
        return rgbString;
    }

    // Lighten the color
    r = Math.min(r + increment, 255);
    g = Math.min(g + increment, 255);
    b = Math.min(b + increment, 255);

    return `rgb(${r}, ${g}, ${b})`;
}

function getColorShaded(rgbString, decrement) {
    let rgb = rgbString.match(/\d+/g).map(Number);
    let [r, g, b] = rgb;

    r = Math.max(r - decrement, 0);
    g = Math.max(g - decrement, 0);
    b = Math.max(b - decrement, 0);

    return `rgb(${r}, ${g}, ${b})`;
}

function lighter() {
    let lighterButton = document.querySelector('#lighter-button');
    let squares = document.querySelectorAll('.grid-item');
    let isClicked = false;
    let isMouseDown = false;

    lighterButton.addEventListener('click', () => {
        isClicked = !isClicked;
        if (isClicked) {
            setActiveButton(lighterButton);
            disableOtherButtons(lighterButton);
        } else {
            enableAllButtons();
            activeButton = null;
        }
    });

    squares.forEach((square) => {
        square.addEventListener('mousedown', () => {
            isMouseDown = true;
        });

        square.addEventListener('mouseup', () => {
            isMouseDown = false;
        });

        square.addEventListener('mouseover', (e) => {
            if (isMouseDown && isClicked) {
                let curBackgroundColor = getComputedStyle(e.target).backgroundColor;
                if (curBackgroundColor !== 'rgb(255, 255, 255)') { // Check if the color is not white
                    let newColor = getLightenedColor(curBackgroundColor, 20);
                    e.target.style.backgroundColor = newColor;
                }
            }
        });

        square.addEventListener('click', (e) => {
            if (isClicked) {
                let curBackgroundColor = getComputedStyle(e.target).backgroundColor;
                if (curBackgroundColor !== 'rgb(255, 255, 255)') { // Check if the color is not white
                    let newColor = getLightenedColor(curBackgroundColor, 20);
                    e.target.style.backgroundColor = newColor;
                }
            }
        });
    });
}

function shader() {
    let shaderButton = document.querySelector('#shader-button');
    let squares = document.querySelectorAll('.grid-item');
    let isClicked = false;
    let isMouseDown = false;

    shaderButton.addEventListener('click', () => {
        isClicked = !isClicked;
        if (isClicked) {
            setActiveButton(shaderButton);
            disableOtherButtons(shaderButton);
        } else {
            enableAllButtons();
            activeButton = null;
        }
    });

    squares.forEach((square) => {
        square.addEventListener('mousedown', () => {
            isMouseDown = true;
        });

        square.addEventListener('mouseup', () => {
            isMouseDown = false;
        });

        square.addEventListener('mouseover', (e) => {
            if (isMouseDown && isClicked) {
                let curBackgroundColor = getComputedStyle(e.target).backgroundColor;
                let newColor = getColorShaded(curBackgroundColor, 20);
                e.target.style.backgroundColor = newColor;
            }
        });

        square.addEventListener('click', (e) => {
            if (isClicked) {
                let curBackgroundColor = getComputedStyle(e.target).backgroundColor;
                let newColor = getColorShaded(curBackgroundColor, 20);
                e.target.style.backgroundColor = newColor;
            }
        });
    });
}

function clearGrid() {
    const clearButton = document.querySelector('#clear-button');
    clearButton.addEventListener('click', () => {
        const squares = document.querySelectorAll('.grid-item');
        squares.forEach(square => {
            square.style.backgroundColor = '#fff';
        });
    });
}

function toggleGridLines() {
    const toggleButton = document.querySelector('#toggle-button');
    let isGridLinesVisible = true;

    toggleButton.addEventListener('click', () => {
        const squares = document.querySelectorAll('.grid-item');
        squares.forEach(square => {
            if (isGridLinesVisible) {
                square.style.border = 'none';
            } else {
                square.style.border = '1px solid #9290C3';
            }
        });
        isGridLinesVisible = !isGridLinesVisible;
    });
}

function updateDrawFunction() {
    const squares = document.querySelectorAll('.grid-item');
    if (isAnyButtonActive) {
        squares.forEach(square => {
            square.removeEventListener('click', drawSquare);
            square.removeEventListener('mouseover', drawSquareOnHover);
        });
    } else {
        squares.forEach(square => {
            square.addEventListener('click', drawSquare);
            square.addEventListener('mouseover', drawSquareOnHover);
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    createGrid(25);
    slider();
    draw();
    rainbowMode();
    eraser();
    lighter();
    shader();
    clearGrid();
    toggleGridLines();
});
