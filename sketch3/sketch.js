// 'shared' is everything else (grid, colors, controls)
let shared;
// 'clear' corresponds to timer
let clear;
// 'drawColor' starting color
let drawColor = "tomato";

// color palette
const palette = [
    "tomato",
    "darkorange",
    "gold",
    "chartreuse",
    "aqua",
];

// load the sketch; define variables
function preload() {
    partyConnect(
        "wss://demoserver.p5party.org",
        "ew-cy_sketch3",
        "main", 
    );
    shared = partyLoadShared("shared");
    clear = partyLoadShared("clear", {
        clickHistory:[],
        startTime: Date.now(),
    });
}

// set up canvas and grid
function setup() {
    createCanvas(500, 500);
    ellipseMode(CORNER);

    console.log(JSON.stringify(shared));

    // initialize grid (DO NOT REMOVE)
    if (!shared.grid) resetGrid();

}

// defines result of where you click on the grid
function mousePressed() {
    // 5 boxes by 5 boxes
    let col = floor(mouseX / 80);
    let row = floor(mouseY / 80);

    // palette is the bottom row, each column gets a color
    if (row === 5 && col >= 0 && col <= 4) drawColor = palette[col] || "white";
    // reset button
    if (row === 5 && col === 5) resetGrid();

    // color controls
    if (col >= 0 && col <= 4 && row >= 0 && row <= 5) {
        if (shared.grid[col][row] === drawColor) {
            shared.grid[col][row] = false;
        } else {
            shared.grid[col][row] = drawColor;
        }
    }
}

// defines reset button; if red x is clicked, grid resets
function resetGrid() {
    // plots new grid
    const newGrid = [];
    for (let col = 0; col < 5; col++) {
        newGrid[col] = new Array(5).fill(false);
    }
    shared.grid = newGrid;
}

// defines user clicks as drawn pixels or palette choice
function draw() {
    background('lightgray');
    drawUI();
    drawPixels();
}

// defines color palette
function drawUI() {
// push() pop() allows you to switch between colors
    push();
    strokeWeight(3);

// when clicked, color selected and palette stroke changes
for (let i = 0; i < palette.length; i++) {
    fill(palette[i]);
    if (palette[i] === drawColor) {
        stroke("white");
    } else {
        stroke("black");
    }
    ellipse(i * 80 + 4, 400 + 4, 80 - 8, 80 - 8);
}
// defines style of red 'X'
  noFill();
  stroke("red");
  line(480 + 5, 400 + 5, 450 - 5, 440 - 5);
  line(450 - 5, 400 + 5, 480 + 5, 440 - 5);

  pop();

}

// defines drawn pixel
function drawPixels() {
  push();
  noStroke();
  // defines width and length of each pixel based on 400
  for (let row = 0; row < 5; row++) {
    for (let col = 0; col < 5; col++) {
      const x = col * 80;
      const y = row * 80;
      if (shared.grid[col][row]) {
        fill(color(shared.grid[col][row]));
        rect(x + 1, y + 1, 80 - 2, 80 - 2, 2, 2, 2, 2);
      }
    }
  }
  pop();

  // timer(only for host)
  if (partyIsHost()) {
    // timer
    // clears after 10 seconds
    const elapsed = Date.now() - clear.startTime;
    if (elapsed > 10000) {
    partySetShared(clear, {
        startTime: Date.now(),
        clickHistory: [],
    });
    }

    // out put some debugging info
    fill(255);
    textSize(24);
    textFont("Times New");
    text("your time is up, pew pew.", 10, 30);
    text(elapsed / 1000, 10, 60);
    }
}