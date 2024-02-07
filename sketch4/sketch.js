// declare variable for shared object
let shared;

function preload() {
    
    // establish connection to party server
    partyConnect(
        "wss://demoserver.p5party.org",
        // app name
        "ew_sketch4",
        // room name
        "main", 
    );

    // load the shared object
    shared = partyLoadShared("shared");
}

function setup() {
    createCanvas(500, 500);
    textAlign(CENTER, CENTER);

    // set/reset shared object properties
    partySetShared(shared, {
        letter: 'code',
    });
}

function keyPressed() {

    // set value of shared.letter to morse code equivalent of key pressed
    if (shared.letter = (keyCode === 65) ) {
            shared.letter = '•-';
        } else if (shared.letter = (keyCode === 66) ) {
            shared.letter = '-•••';
        } else if (shared.letter = (keyCode === 67) ) {
            shared.letter = '-•-•';
        } else if (shared.letter = (keyCode === 68) ) {
            shared.letter = '-••';
        } else if (shared.letter = (keyCode === 69) ) {
            shared.letter = '•';
        } else if (shared.letter = (keyCode === 70) ) {
            shared.letter = '••-•';
        } else if (shared.letter = (keyCode === 71) ) {
            shared.letter = '--•';
        } else if (shared.letter = (keyCode === 72) ) {
            shared.letter = '••••';
        } else if (shared.letter = (keyCode === 73) ) {
            shared.letter = '••';
        } else if (shared.letter = (keyCode === 74) ) {
            shared.letter = '•---';
        } else if (shared.letter = (keyCode === 75) ) {
            shared.letter = '-•-';
        } else if (shared.letter = (keyCode === 76) ) {
            shared.letter = '•-••';
        } else if (shared.letter = (keyCode === 77) ) {
            shared.letter = '--';
        } else if (shared.letter = (keyCode === 78) ) {
            shared.letter = '-•';
        } else if (shared.letter = (keyCode === 79) ) {
            shared.letter = '---';
        } else if (shared.letter = (keyCode === 80) ) {
            shared.letter = '•--•';
        } else if (shared.letter = (keyCode === 81) ) {
            shared.letter = '--•-';
        } else if (shared.letter = (keyCode === 82) ) {
            shared.letter = '•-•';
        } else if (shared.letter = (keyCode === 83) ) {
            shared.letter = '•••';
        } else if (shared.letter = (keyCode === 84) ) {
            shared.letter = '-';
        } else if (shared.letter = (keyCode === 85) ) {
            shared.letter = '••-';
        } else if (shared.letter = (keyCode === 86) ) {
            shared.letter = '•••-';
        } else if (shared.letter = (keyCode === 87) ) {
            shared.letter = '•--';
        } else if (shared.letter = (keyCode === 88) ) {
            shared.letter = '-••-';
        } else if (shared.letter = (keyCode === 89) ) {
            shared.letter = '-•--';
        } else if (shared.letter = (keyCode === 90) ) {
            shared.letter = '--••';
        } else {
            shared.letter = key;
        }    
}

function draw() {
    background('darkblue');

    // configure text options
    fill('lightblue');
    textFont('COURIER NEW');
    textSize(140);

    // draw most recent key pressed to the screen
    text(shared.letter, width / 2, height / 2);
}