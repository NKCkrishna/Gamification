const objectiveFrequency = 0.6; 
const gridWidth = 11;
const gridHeight = 11;
const cellSize = 50;
const grid = make2DGrid();
const maxStrikes = 3;
let strikes = 0;
let centerTranslation;
let gameIsOver = false;

function setup() {
    createCanvas(800, 600);
    loopGrid((x, y) => {
        grid[x][y] = new Cell(x, y, cellSize);
    });

    topNums = grid.map((col) => [formatArray(col), col[0].xPx]);

    sideNums = [];
    for (let i = 0; i < gridHeight; i++) {
        row = grid.map((col) => col[i]);
        sideNums.push([formatArray(row), row[0].yPx]);
    }

    // Calculate how many pixels we need to translate
    // to center horizontally
    centerTranslation = (width - (gridWidth + 1) * cellSize) / 2;
}

function draw() {
    background(125);

    // Center
    translate(centerTranslation, 0);
    // Make space for numbers
    translate(cellSize, cellSize);

    // TODO: Arrange numbers better
    fill("black");
    textSize(14);
    noStroke();
    for (num of topNums) {
        text(num[0], num[1], -5);
    }

    for (num of sideNums) {
        text(num[0], 5 - cellSize, num[1] + cellSize / 2);
    }
    stroke("black");

    loopGrid((x, y) => {
        grid[x][y].show();
    });
}

function mouseReleased() {
    let clickedOn = getClickedCell();
    if (!clickedOn) return;

    if (mouseButton === LEFT) {
        clickedOn.onLeftClick();
    }

    if (mouseButton === RIGHT) {
        clickedOn.onRightClick();
    }
}

function getClickedCell() {
    // Don't click outside of game
    if (mouseX > centerTranslation + cellSize + gridWidth * cellSize || mouseX < centerTranslation + cellSize) return;
    if (mouseY > (gridHeight + 1) * cellSize || mouseY < cellSize) return;

    // Don't click if game is over
    if (gameIsOver) return;

    // Calculate which cell was clicked on from mouse co-ordinates
    return grid[floor((mouseX - (centerTranslation + cellSize)) / cellSize)][floor((mouseY - cellSize) / cellSize)];
}

function formatArray(cellArr) {
    let arr = cellArr.map((i) => i.isObjective);
    let result = [];
    let localSum = 0;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i]) {
            localSum++;
            if (!arr[i + 1]) {
                result.push(localSum);
                localSum = 0;
            }
        }
    }
    return result.join("-");
}

function strike() {
    strikes++;
    if (strikes >= maxStrikes) {
        setTimeout(lose, 100);
    }
}

function make2DGrid() {
    var output = [];
    for (let i = 0; i < gridWidth; i++) {
        output[i] = [];
    }
    return output;
}

function loopGrid(callback) {
    for (let i = 0; i < gridWidth; i++) {
        for (let j = 0; j < gridHeight; j++) {
            callback(i, j);
        }
    }
}

function win() {
    if (confirm("You win! Play again?")) {
        location.reload();
    }
}

function lose() {
    gameIsOver = true;
    if (confirm(`You lose! You missed an objective ${maxStrikes} times. Play again?`)) {
        location.reload();
    }
}

document.addEventListener("contextmenu", (event) => event.preventDefault());
