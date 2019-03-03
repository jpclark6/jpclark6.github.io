var number;
// define number as a global variable to be used later
var guesses = 0;
// to be used in optional future iteration to keep track of score
var minNumber = 1;
// current minimum guessing number, defined globally
var maxNumber = 100;
// current maximum guessing number, defined globally

function resetGame(){
  // create function to reset the game
  number = findNewNumber();
  // get a new number
  guesses = 0;
  // reset guesses
  resetInputLimits();
  // change the html input to accept only new min max limites
  updateLastGuessResult('');
  // reset text 
  updateLastGuess('');
  // reset last guess
  disableReset(true);
  // reset disabled after a reset
  disableClear(true);
  // clear disabled since nothing can be cleared
  updateGuessInput('');
  // no guess input at reset
  updateNote('');
  // no note after reset
  updateMinMax();
  // update input fields for min max to show current min max
  console.log('Answer is ' + number);
  // for cheating
}

function updateMinMax(){
  // function to update the input fields
  $('.min-number').val(minNumber);
  // update min number input field with min
  $('.max-number').val(maxNumber);
  // update max number input field with max
}

function findNewNumber() {
  // function to get a new number
  return parseInt(Math.random() * (maxNumber - minNumber) + minNumber);
  // return back a new number between the min and max numbers
}

function resetInputLimits(){
  // function to change min and max on number input
  $('.guess').attr({ 'min': minNumber, 'max': maxNumber });
  // jquery to do just so
}

function updateLastGuess(txt){
  // last guess text to be updated with txt
  $('.last-guess').text(txt);
  // update text with txt
}

function updateLastGuessResult(txt){
  // update last guess text
  $('.last-guess-result').text(txt);
  // update text with txt
}

function updateGuessInput(txt){
  // function to update input value with txt, mainly to clear it
  $('.guess').val(txt);
  // update value of input
}

function disableReset(tf){
  // function to disable reset button
  $('.reset').prop('disabled', tf);
  // reset button disabled with tf is true
}

function disableClear(tf){
  // function to disable clear if nothing can be cleared
  $('.clear').prop('disabled', tf);
  // diabled with tf is true
}

function updateNote(note){
  // function to update note text area
  $('.last-guess-note').text(note);
  // update with note
}

$('.guess').on('keyup click', function(){
  // event listener on guess class listening for keyup and click
  var currentValue = $('.guess').val();
  // get value of input field, could also use let or const
  if(currentValue === ''){
    // if input field is empty
    disableClear(true);
    // disable the clear button
  } else {
    disableClear(false);
    // if there is text in it, don't disable it
  }
});

$('.submit-guess').on('click', function(e){
  // listen for when the submit button is pressed
  e.preventDefault();
  // make sure the button doesn't go anywhere
  startCheckGuess();
  // check the guess with this function
});

function startCheckGuess(){
  // function to check guess
  let guess = parseInt($('.guess').val());
  // find the guess value and turn it into an integer, const or var also work
  if (guess > maxNumber || guess < minNumber) {
    // if the guess is out of range
    updateLastGuessResult('Number out of range');
    // tell user it is out of the range
  } else if (guess >= minNumber || guess <= maxNumber) {
    // if the guess is valid
    updateLastGuess(guess);
    // tell the user what they guessed
    updateNote('Your last guess was');
    // update the note to the user
    checkGuess(guess);
    // check to see if the guess is actually correct
    guesses += 1;
    // add one to the guesses total
    $('.guess').val('');
    // reset the input for the guess to make for a better UX
    $('.reset').prop('disabled', false);
    // make sure the rest button is enabled
    $('.clear').prop('disabled', true);
    // disable the clear button since input will be empty
  } else {
    // all other cases
    updateLastGuess('Invalid guess');
    // return text telling user it's not valid
  }
}

$('.clear').on('click', function(e){
  // listen for clear button to be pressed
  e.preventDefault();
  // prevent the button from going anywhere
  updateGuessInput('');
  // update input area to be empty
  disableClear(true);
  // clear button should be disabled after being cleared
});

$('.reset').on('click', function(e){
  // listen for the reset button to be clicked
  e.preventDefault();
  // prevent the page from being changed
  resetGame();
  // run reset game function
})

function checkGuess(guess){
  // function to check a guess
  var answer;
  if(guess > number){
    // if the guess is higher than the answer
    answer = 'That is too high';
    // set answer to result
  } else if(guess < number){
    // if the guess is lower than the actual number
    answer = 'That is too low';
    // set answer to result
  } else {
    // only other possibility is that it is the correct answer
    answer = 'BOOM!';
    // set return value to boom
    updateNote('Max/min increased by 20');
    // increase max and min by 10 each
    maxNumber += 10;
    // increase max number by 10
    minNumber -= 10;
    // decrease min number by 10
  }
  updateLastGuessResult(answer)
  // update text area for user with their result of checking the answer
}

$('.change-range').on('click', function(e){
  // listen for the change range button to be pressed
  e.preventDefault();
  // prevent the button from doing anything else
  minNumber = parseInt($('.min-number').val());
  // update the minNumber to the value that was in the min number input
  maxNumber = parseInt($('.max-number').val());
  // update the maxNumber to the value that was in the max number input
  resetGame();
  // run the reset game function
})

$(document).ready(function(){
  // wait for the page load
  resetGame();
  // and then run the reset game function
});