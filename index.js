function createGrid (gridSize){
    let itemWidth = 100 / gridSize;
    let itemHeight = 100 / gridSize;
    let grid = document.querySelector('.grid-container');

    for(let i = 0 ; i < gridSize * gridSize ; i++){
        let square = document.createElement('div');
        square.setAttribute('class' , 'grid-item');
        square.style.width = `${itemWidth}%`;
        square.style.height = `${itemHeight}%`;
        grid.appendChild(square);
    }   
}

function slider(){
    let height = document.querySelector('.gridHeight');
    let width = document.querySelector('.gridWidth');
    let sliderValue = document.querySelector('.slider');
    // show the initial height and width of the grid 
    height.textContent = `${sliderValue.getAttribute("value")}`;
    width.textContent = `${sliderValue.getAttribute("value")}`;

    //input manipulation
    sliderValue.addEventListener("input" , (e) => {
        let grid = document.querySelector('.grid-container');

        //change the values of height and width and display them 
        height.textContent = `${e.target.value}`;
        width.textContent = `${e.target.value}`; 

        //change number of squares inside the grid 
        grid.textContent = "";
        createGrid(e.target.value);
        draw();
        rainbowMode();
        eraser();

        //making the smallest dimension of the grid 5*5
        if(e.target.value <= 5){
            height.textContent = "5";
            width.textContent = "5";  
            grid.textContent = "";
            createGrid(5);  
            console.log("under 5")
        }
    })   
}

function draw(){
    let squares = document.querySelectorAll('.grid-item');
    let grid = document.querySelector('.grid-container');
    let gridItemList = Array.from(squares);
    let isMouseDown = false;

    //Coloring a square when it's clicked with the color selected in the color picker
    gridItemList.forEach((square) => {
        square.addEventListener('click' , (e) => {
            let selectedColor = document.querySelector('#color-picker').value;
            e.target.style.backgroundColor = selectedColor;
        })
    })
    
    // Color all the squares passed by the mouse
    gridItemList.forEach((square) => {
        square.addEventListener('mousedown' , () => {
            isMouseDown = true;
        })

        square.addEventListener('mouseup' , () => {
            isMouseDown = false;
        })

        //color the hovered squares if IsMouseDown is active
        square.addEventListener('mouseover' , (e) => {
            if (isMouseDown) {
                let selectedColor = document.querySelector('#color-picker').value;
                e.target.style.backgroundColor = selectedColor;
            }
        })    

        //in case the cursor is outside the grid, disable the process of coloring when cursor is over 
        square.addEventListener('dragstart', (e) => {
            e.preventDefault();
            isMouseDown = false;
        });
    })


    grid.addEventListener('mouseleave' , () => {
        isMouseDown = false;
    })
}

function rainbowMode(){
    let rainbowButton = document.querySelector('#rainbow-button');
    let squares = document.querySelectorAll('.grid-item');
    let gridItemList = Array.from(squares);
    let isClicked = false
    let isMouseDown = false

    rainbowButton.addEventListener('click' , (e) => {
        isClicked = !isClicked;
        if(isClicked){
            e.target.style.backgroundColor = '#9290C3';
            e.target.style.color = '#1B1A55';
        }else{
            e.target.style.backgroundColor = '#1B1A55';
            e.target.style.color = '#9290C3';
        }
    })

    gridItemList.forEach((square) => {
        square.addEventListener('mousedown' , () => {
            isMouseDown = true;
        })

        square.addEventListener('mouseup' , () => {
            isMouseDown = false;
        })

        square.addEventListener('mouseover' ,(e) => { 
            if(isMouseDown && isClicked){
                e.target.style.backgroundColor =  `#${Math.floor(Math.random()*16777215).toString(16)}`;
            }
        })

        //color the first square clicked
        square.addEventListener('click' , (e) => {
            if(isClicked){
                e.target.style.backgroundColor =  `#${Math.floor(Math.random()*16777215).toString(16)}`;
            }
        })
    })
}

function eraser(){
    let eraserButton = document.querySelector('#eraser-button');
    let squares = document.querySelectorAll('.grid-item');
    let gridItemList = Array.from(squares);
    let isClicked = false;
    let isMouseDown = false;

    //verify if the eraser button is clicked
    eraserButton.addEventListener('click' , (e) => {
        isClicked = !isClicked;
        if(isClicked){
            e.target.style.backgroundColor = '#9290C3';
            e.target.style.color = '#1B1A55';
        }else{
            e.target.style.backgroundColor = '#1B1A55';
            e.target.style.color = '#9290C3';
        }
    })   
    
    gridItemList.forEach((square) => {
        square.addEventListener('mousedown' , () => {
            isMouseDown = true;
        })

        square.addEventListener('mouseup' , () => {
            isMouseDown = false;
        })

        square.addEventListener('mouseover' ,(e) => { 
            if(isMouseDown && isClicked){
                e.target.style.backgroundColor =  `#fff`;
            }
        })
    }) 
}

//function to light a given color 
function getLightenedColor(rgbString, increment) {
    // Extract RGB values from the input string
    let rgb = rgbString.match(/\d+/g).map(Number);
    let [r, g, b] = rgb;

    r = Math.min(r + increment, 255);
    g = Math.min(g + increment, 255);
    b = Math.min(b + increment, 255);

    return `rgb(${r}, ${g}, ${b})`;
}

function getColorShaded(rgbString, decrement){
    // Extract RGB values from the input string
    let rgb = rgbString.match(/\d+/g).map(Number);
    let [r, g, b] = rgb;

    r = Math.max(r - decrement, 0);
    g = Math.max(g - decrement, 0);
    b = Math.max(b - decrement, 0);

    return `rgb(${r}, ${g}, ${b})`;
}

function lighter(){
    let lighterButton = document.querySelector('#lighter-button');
    let squares = document.querySelectorAll('.grid-item');
    let gridItemList = Array.from(squares);
    let isClicked = false;
    let isMouseDown = false;

        //verify if the lighter button is clicked
        lighterButton.addEventListener('click' , (e) => {
            isClicked = !isClicked;
            if(isClicked){
                e.target.style.backgroundColor = '#9290C3';
                e.target.style.color = '#1B1A55';
            }else{
                e.target.style.backgroundColor = '#1B1A55';
                e.target.style.color = '#9290C3';
            }
        })   
        
        gridItemList.forEach((square) => {
            square.addEventListener('mousedown' , () => {
                isMouseDown = true;
            })
    
            square.addEventListener('mouseup' , () => {
                isMouseDown = false;
            })
    
            square.addEventListener('mouseover' ,(e) => { 
                if(isMouseDown && isClicked ){
                    let curBackgroundColor = getComputedStyle(e.target).backgroundColor;
                    let newColor = getLightenedColor(curBackgroundColor, 20); 
                    e.target.style.backgroundColor = newColor;
                }
            })
        }) 
} 

function shader(){
    let lighterButton = document.querySelector('#lighter-button');
    let squares = document.querySelectorAll('.grid-item');
    let gridItemList = Array.from(squares);
    let isClicked = false;
    let isMouseDown = false;

        //verify if the lighter button is clicked
        lighterButton.addEventListener('click' , (e) => {
            isClicked = !isClicked;
            if(isClicked){
                e.target.style.backgroundColor = '#9290C3';
                e.target.style.color = '#1B1A55';
            }else{
                e.target.style.backgroundColor = '#1B1A55';
                e.target.style.color = '#9290C3';
            }
        })   
        
        gridItemList.forEach((square) => {
            square.addEventListener('mousedown' , () => {
                isMouseDown = true;
            })
    
            square.addEventListener('mouseup' , () => {
                isMouseDown = false;
            })
    
            square.addEventListener('mouseover' ,(e) => { 
                if(isMouseDown && isClicked ){
                    let curBackgroundColor = getComputedStyle(e.target).backgroundColor;
                    let newColor = getColorShaded(curBackgroundColor, 20); 
                    e.target.style.backgroundColor = newColor;
                }
            })
        }) 
} 


createGrid(25);
slider();
draw();
rainbowMode();
eraser();
lighter();git add
shader();



