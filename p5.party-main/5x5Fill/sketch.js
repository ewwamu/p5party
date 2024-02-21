// Hi! This game is by Chloe and Emma.
// Thanks to CD Code Tutors, love you guys.

// there are 2 central processes

// 'shared' is everything else (grid, colors, controls)
let shared;
// some things are just for 'me', yk
let me;
// and some things are for everyone else
let guests;
// 'clear' corresponds to timer
let clear;
// color this player is drawing with
let drawColor;
// different screens
let sceneNum = 0;
// tracking if game is running, keeping it at t/f 'logic gate' to control app flow
let gameRunningState = false;

// players
let lychee;
let kumquat;
let durian;

let imgs = {
	'tomato': undefined,
	'darkorange': undefined
}

// Color palette
const palette = ['tomato', 'darkorange', 'chartreuse'];

// Load the sketch; define variables
function preload() {
	partyConnect('wss://demoserver.p5party.org', 'ew-cy_5x5sketch-2', 'main');
	shared = partyLoadShared('shared', {
		grid: [],
	});

	me = partyLoadMyShared({
		// Everyone given observer at beginning
		role: 'observer',
	});

	guests = partyLoadGuestShareds();

	shared_time = partyLoadShared('shared_time');
	// imgs.tomato = loadImage('tomatoImage');
	// imgs.darkorange = loadImage('orangeImage');

	lychee = loadImage('./assets/lychee.png')
	kumquat = loadImage('./assets/kumquat.png')
	durian = loadImage('./assets/durian.png')


}



// Set up canvas and grid
function setup() {
	// createCanvas(400, 500);
	//  Host has to click start for the timer to begin
	button = createButton('start');
	button.position(CENTER);
	button.style('font-size', '20px');
	button.style('background-color', 'hotpink');
	button.style('border-radius', '25px');

	
	ellipseMode(CORNER);
	console.log('init setup done')
	console.log(JSON.stringify(shared));
	
	if (partyIsHost()) {
		// Initialize grid; check if there is a host instead of shared grid
		resetGrid();
		// Only one person has timer (host) who'll control
		shared_time.gameTimer = 20; // Change this to the desired initial value
		// Only one person has timer (host) who'll control
		partySetShared(shared_time, { gameTimer: shared_time.gameTimer });
	}
	textFont('FT88-Regular');

}

// Defines result of where you click on the grid
// For next iteration, reduce number of players to 3
// Design wireframe/flow of how it should look
// Figure out image inclusion
function mousePressed() {
	const p1 = guests.find((p) => p.role === 'tomato');
	const p2 = guests.find((p) => p.role === 'darkorange');
	const p3 = guests.find((p) => p.role === 'chartreuse');
	// const p4 = guests.find((p) => p.role === 'chartreuse');
	// const p5 = guests.find((p) => p.role === 'aqua');
	
	// where switch on happ! true
	gameRunningState = true;
	console.log("gameState made true!")
	if (p1 === me || p2 === me || p3 === me) {
		drawColor = me.role;
		// 5 boxes by 5 boxes
		let col = floor(mouseX / 100);
		let row = floor(mouseY / 100);

		// Palette is the bottom row, each column gets a color
		if (col >= 0 && col <= 5 && row >= 0 && row <= 5) {
			if (shared.grid[col][row] === drawColor) {
				shared.grid[col][row] = false;
			} else {
				shared.grid[col][row] = drawColor;
			}
		}
	}
}

// Defines reset
function resetGrid() {
	// Plots new grid
	const newGrid = [];
	for (let col = 0; col < 5; col++) {
		newGrid[col] = new Array(5).fill(false);
	}
	shared.grid = newGrid;

}

// Defines user clicks as drawn pixels or palette choice
function draw() {
	// important loop one
	if (sceneNum == 0) {
		// sends 0 --> 1 
		createCanvas(windowWidth, windowHeight);
		button.mousePressed(updatesceneNum);
		text('game instructions', 0, 50);
		background('lightpink');

	}
	console.log(gameRunningState)
	// loop two (main, "always" on)
	if (sceneNum == 1 && gameRunningState === true) {
		createCanvas(windowWidth, windowHeight);
		background('papayawhip');
		assignPlayers();
		drawPixels();
		gameTimer();
		drawUI();
	}
}

function updatesceneNum() {
	sceneNum = sceneNum + 1;
	button.remove();
}

// Defines color palette
function drawUI() {
	// push() pop() allows you to switch between colors
	// push();
	strokeWeight(3);

	// When clicked, color selected and palette stroke changes
	for (let i = 0; i < palette.length; i++) {
		fill(palette[i]);
		if (palette[i] === drawColor) {
			stroke('white');
		} else {
			stroke('black');
		}
		ellipse(i * 100 + 104, 500 + 4, 100 - 8, 100 - 8);
	}
	// pop();

	// Display timer
	textFont('FT88-Regular');
	text(shared_time.gameTimer, 10, 575);
	textSize(60);
}

// Defines drawn pixel
function drawPixels() {
	push();
	noStroke();
	// Defines width and length of each pixel based on 400
	for (let row = 0; row < 5; row++) {
		for (let col = 0; col < 5; col++) {
			const x = col * 100;
			const y = row * 100;

			if (shared.grid[col][row]) {
				const currentColor = shared.grid[col][row];
				const currentImage = imgs[currentColor]
				if (currentColor === 'tomato') {
					image(lychee, x + 1, y + 1, 100 - 2, 100 - 2,)
				
				} else if (currentColor === 'darkorange') {
					image(kumquat, x + 1, y + 1, 100 - 2, 100 - 2,)
				
				} else if (currentColor === 'chartreuse') {
					image(durian, x + 1, y + 1, 100 - 2, 100 - 2,)
				} else {
					fill(color(currentColor));
					rect(x + 1, y + 1, 100 - 2, 100 - 2, 2, 2, 2, 2);
				}
			}
		}
	}
	pop();
}

function assignPlayers() {
	// If there isn't a tomato, find new observer and add it onto there instead of switching player colors
	// Need previous observer to establish this
	if (!guests.find((p) => p.role === 'tomato')) {
		// Find the first observer
		const o = guests.find((p) => p.role === 'observer');
		// console.log("found first observer", o, me, o === me);
		// If thats me, take the role
		if (o === me) o.role = 'tomato';
	}
	if (!guests.find((p) => p.role === 'darkorange')) {
		const o = guests.find((p) => p.role === 'observer');
		if (o === me) o.role = 'darkorange';
	}
	if (!guests.find((p) => p.role === 'chartreuse')) {
		const o = guests.find((p) => p.role === 'observer');
		if (o === me) o.role = 'chartreuse';
	}
	// if (!guests.find((p) => p.role === 'chartreuse')) {
	// 	const o = guests.find((p) => p.role === 'observer');
	// 	if (o === me) o.role = 'chartreuse';
	// }
	// if (!guests.find((p) => p.role === 'aqua')) {
	// 	const o = guests.find((p) => p.role === 'observer');
	// 	if (o === me) o.role = 'aqua';
	// }
}

function gameTimer() {
	if (partyIsHost()) {
		if (frameCount % 60 === 0) {
			shared_time.gameTimer--;
		}
		if (shared_time.gameTimer === 0) {
			console.log('Game Over: timer is out');
			// Call determineWinner when the timer hits 0
			determineWinner();
		}
	}
}

// called once so naturally this is used to make gameRunning false ag
function determineWinner() {
	// Object to store the count of squares filled by each player
	let playerSquares = {};

	// Initialize counts for each player
	playerSquares['me'] = 0;
	for (let guest of guests) {
		playerSquares[guest.role] = 0;
	}

	// Count squares filled by each player
	for (let col = 0; col < 5; col++) {
		for (let row = 0; row < 5; row++) {
			if (shared.grid[col][row] === me.role) {
				playerSquares['me']++;
			} else {
				for (let guest of guests) {
					if (shared.grid[col][row] === guest.role) {
						playerSquares[guest.role]++;
						// Once found, no need to continue checking other guests
						break;
					}
				}
			}
		}
	}

	// Find the maximum number of squares filled by any player
	let maxSquares = Math.max(...Object.values(playerSquares));

	// Check if there is more than one player with the maximum number of squares filled
	let winners = [];
	for (let player in playerSquares) {
		if (playerSquares[player] === maxSquares) {
			winners.push(player);
		}
	}

	// Display the result
	if (winners.length === 1 && winners[0] === 'me') {
		displayResult('You WIN!');
	} else if (winners.length > 1) {
		displayResult("It's a tie!");
	} else {
		displayResult('You LOSE!');
	}
	// FALSE happ at end
	gameRunningState = false;
}

function displayResult(result) {
	createCanvas(windowWidth, windowHeight);
	background('lightpink');
	//  Define in setup to fix the look of the timer
	// fill("white");
	textStyle(CENTER);
	// textStyle(BOLD);
	// textSize(50);
	text(result, 150, 250);
	setTimeout(setup, 500);
	// Giving result delay before resetting --> fixes flash
}
