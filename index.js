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
    height.textContent = `${sliderValue.getAttribute("value")}`;
    width.textContent = `${sliderValue.getAttribute("value")}`;
    sliderValue.addEventListener("input" , (e) => {
        height.textContent = `${e.target.value}`;
        width.textContent = `${e.target.value}`; 
        let grid = document.querySelector('.grid-container');
        grid.textContent = "";
        createGrid(e.target.value)
    } )   
}

createGrid(25);
slider()





