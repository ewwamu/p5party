// let timer = 10;

let shared;

function preload() {
    partyConnect(
        "wss://demoserver.p5party.org",
        "ew_hello_party",
        "main",
    );
    
    shared = partyLoadShared("shared", shared);

}

function setup() {
    createCanvas(800, 400);
    background("aliceblue");
    textSize(25);
    text('DRAW A...', 350, 50);

  }

function draw() {
    line(400, 375, 400, 75);
    stroke("darkblue");
    if (mouseIsPressed === true) {
        line(mouseX, mouseY, mouseX, mouseY);
    }
}

// function draw() {
//     background("skyblue");
//     fill("darkblue");
//     ellipse(mouseX, mouseY, 50, 50);
// }
