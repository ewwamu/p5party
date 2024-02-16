l;

function preload() {
	partyConnect('wss://demoserver.p5party.org', 'week2sketch3', 'main');
	shared = partyLoadShared('shared');
	// dude = partyLoadShared('dude', {
	// 	x: 0,
	// 	y: 0,
	// 	p: 10,
	// 	c: 20,
	// });
}

// sync letter
function setup() {
	createCanvas(400, 400);
	noStroke();
	textAlign(CENTER, CENTER);
	partySetShared(shared, {
		letter: 'a',
	});
}

function keyPressed() {
	shared.letter = key;
}

function draw() {
	background('#bdd5de');
	fill('#f57f17');
	textFont('Times New');
	textSize(70);
	text(shared.letter, width / 2, height / 2);
}
