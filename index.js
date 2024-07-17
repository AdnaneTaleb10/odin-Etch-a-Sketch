function drowSquaresOfGrid(){
    const grid = document.querySelector('.grid-container');
    let square = document.createElement('div');
    square.setAttribute('class' , 'grid-item');
    square.style.width = '4%';
    square.style.height = '4%';
    grid.appendChild(square);
}

for(let i = 0 ; i < 625 ; i++){
    drowSquaresOfGrid()
}


