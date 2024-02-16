// introduce two variables (one for x, one for y)
// let x = 200;
// let y = 200;
// which transforms to -->

// two properties on a single variable; now they are related
let pos = {
	x: 100,
	y: 100,
};

function preload() {
	// shared object makes it multiplayer
	partyConnect('wss://demoserver.p5party.org', 'cy_hello_party');
	pos = partyLoadShared('pos', { x: 100, y: 100 });
}

function setup() {
	createCanvas(400, 400);
}

function draw() {
	background('orange');
	fill('white');
	noStroke();
	ellipse(pos.x, pos.y, 50, 50);
}

// Justin uses Copilot, but be careful with overreliance
// mouseUp didn't work, so switched to mousePressed
// no React, no Node (although you'd use it for backend; p5.party goal was to get people to make mpg without serverside work)
function mousePressed() {
	pos.x = mouseX;
	pos.y = mouseY;
}

// if there are synchronous edits to the code, you'd get conflicts if two ppl try to chnge the same data at the same time. the best way to solve this is to minimize the amount of times the code is run.
