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

        //making the lower dimension of the grid 5*5
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

        //color the first square clicked
        square.addEventListener('mousedown', (e) => {
            let selectedColor = document.querySelector('#color-picker').value;
            e.target.style.backgroundColor = selectedColor;
        });

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

createGrid(25);
slider();
draw();


