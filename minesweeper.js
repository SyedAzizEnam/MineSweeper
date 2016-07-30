
var rows = 10;
var cols = 10;
var uncovered = 0;
var numMines;

var [board, boardContainer] = createBoard(rows, cols);

function createBoard(rows, cols) {

  unconvered = 0;
  var squareSize = 500/rows;

  /*setSquareStyle()*/

  var newboard = [];
  for(i=0; i< rows; i++){
    var newEmptyRow = [];
    for(j=0; j< cols; j++){
      newEmptyRow.push(0);
    }
    newboard.push(newEmptyRow);
  }

  numMines = Math.floor(rows*cols/10);
  var mines = []

  for(i=0; i< numMines; i++){
    var randomInt = Math.floor(Math.random()*rows*cols);
    while(mines.indexOf(randomInt) != -1){
        randomInt = Math.floor(Math.random()*rows*cols);
    }

    mines.push(randomInt);
    newboard[Math.floor(randomInt/rows)][randomInt%cols] = 1;
  }

  var newboardContainer = document.getElementById('board');
  newboardContainer.innerHTML = '';

  for(i =0; i < rows; i++){
    for(j=0; j< cols; j++){
      var square = document.createElement("div");
      newboardContainer.appendChild(square);

      square.id = i +','+ j;

      var topPos = i*squareSize;
      var leftPos = j*squareSize;

      square.style.top = topPos + 'px';
      square.style.left = leftPos + 'px';
    }
  }

  newboardContainer.addEventListener("click", uncover)

  return [newboard, newboardContainer]
}

function uncover(e) {
  if(e.target !== e.currentTarget){
    var [row, col] = e.target.id.split(',');
    [row, col] = [parseInt(row), parseInt(col)];

    if(board[row][col] == 0){
      var par = document.createElement("P");
      var t = document.createTextNode(countMines(row,col));
      par.appendChild(t);
      e.target.appendChild(par);

      board[row][col] = 2;
      uncovered += 1;
      e.target.style.background = '#d4edfd';
      if(uncovered+numMines == rows*cols){
        alert("Congratulations! You've won!");
        boardContainer.removeEventListener("click", uncover);
      }
    }

    else if(board[row][col] == 1){
      alert("Oh no you hit a mine! Game over!");
      e.target.style.background = 'red';
      boardContainer.removeEventListener("click", uncover);
    }
  }

  e.stopPropagation();
}

function countMines(row, col) {
  var totalMines = 0;

  for(i=-1; i < 2; i++){
    var cursor_x = row + i;
    if(cursor_x < 0 || cursor_x >= rows){
      continue;
    }

    for(j=-1; j<2; j++){
      var cursor_y = col + j;
      if(cursor_y < 0 || cursor_y >= cols){
        continue;
      }
      if(board[cursor_x][cursor_y] == 1){
        totalMines += 1;
      }
    }
  }

  return totalMines;
}
