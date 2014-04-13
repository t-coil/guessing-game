// VARIABLES

var boxValue = 0;
var randomNumber = Math.floor(Math.random() * 100) + 1; 
console.log(randomNumber);
var clickedCheck = 1;
var alreadyEntered = [];

// EVENT HANDLERS

$(document).ready(function(){
	$('#checkit').click(compCon);
	$('#reset').click(numReset);
	$('#guessbox').keypress(function(event){
		var keycode = (event.keyCode ? event.keyCode : event.which);
		if(keycode == '13'){
			compCon();
		}
	});
});

// FUNCTIONS

// Counts turns, initiates comparisons, stores values in array.

function compCon() {
	boxValue = $('#guessbox').val();
	$('#guessbox').val('');
	if (boxValue > 100) {
		alert('That number is greater than 100!');
	} else if(clickedCheck < 6) {
		howClose();
		compNum();
		stopRepeating();
		clickedCheck++;
	} else {
		$('#hotcold').text('GAME OVER. You lose!');
		$('#answer').text('Press reset.');
	}
	alreadyEntered.push(boxValue);
	console.log(boxValue);
}

// Tells you how far off you are.

function howClose() {
	if (Math.abs(boxValue - randomNumber) >= 50) {
		$('#hotcold').text(boxValue + '? You\'re super wrong!');
	} else if (Math.abs(boxValue - randomNumber) >= 25 && Math.abs(boxValue - randomNumber) < 50) {
		$('#hotcold').text(boxValue + '? You\'re far off.');
	} else if (Math.abs(boxValue - randomNumber) >= 15 && Math.abs(boxValue - randomNumber) < 25) {
		$('#hotcold').text(boxValue + '? You\'re getting warm...');
	} else if (Math.abs(boxValue - randomNumber) >= 4 && Math.abs(boxValue - randomNumber) < 15) {
		$('#hotcold').text(boxValue + '? You\'re close!');
	} else if (Math.abs(boxValue - randomNumber) >= 1 && Math.abs(boxValue - randomNumber) < 4) {
		$('#hotcold').text(boxValue + '? You\'re SUPER CLOSE');
	} else if (Math.abs(boxValue - randomNumber) == 0) {
		$('#hotcold').text('You\'re amazing!');
	} else {
		$('#hotcold').text('');
	}
}

// Tells you whether you're higher or lower than answer.

function compNum() {
	if (boxValue == randomNumber) {
		$('#answer').text('You got it!');
	} else if (boxValue == 0) {
		$('#hotcold').text('');
		$('#answer').text('Zero is not a valid number');
	} else if (boxValue > randomNumber) {
		$('#answer').text('Try guessing lower');
	} else if (boxValue < randomNumber) {
		$('#answer').text('Try guessing higher');
	} else {
		$('#hotcold').text('');
		$('#answer').text('That\'s not a number!');
	}
}

// Stops repeating numbers.

function stopRepeating() {
	for(var i = 0; i < alreadyEntered.length; i++) {
		if (alreadyEntered[i] == boxValue) {
			$('#hotcold').text('You already tried that!');
			$('#answer').text('');
			clickedCheck--;
		}
	}
}

// Resets game.

function numReset() {
	randomNumber = Math.floor(Math.random() * 100) + 1; 
	console.log(randomNumber);
	clickedCheck = 1;
	alreadyEntered = [];
	$('#answer').text('Okay, you\'ve reset. Try again!');
	$('#hotcold').text('');
}

