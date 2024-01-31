let pos;
let strokeColor;


function preload() {
    partyConnect(
        "wss://demoserver.p5party.org",
        "ew_hello_party",
        "main", 
    );
    pos = partyLoadShared("pos", { x: 100, y: 100 });
}


function setup() {
    createCanvas(800, 400);
        strokeColor = random(255);
}

function draw() {
    background("lightpink");
    fill(strokeColor);
    stroke("black");
    ellipse(pos.x, pos.y, 50);

    if (keyIsPressed === true) {
        if (keyCode === UP_ARROW) {
            pos.y = pos.y - 3.5;
        }
        
        if (keyCode === DOWN_ARROW) {
            pos.y = pos.y + 3.5;
        }
        
        if (keyCode === LEFT_ARROW) {
            pos.x = pos.x - 3.5;
        }
        
        if (keyCode === RIGHT_ARROW) {
            pos.x = pos.x + 3.5;
        }
    }
}

function mousePressed() {
    strokeColor = color(random(255), random(255), random(255));
}
