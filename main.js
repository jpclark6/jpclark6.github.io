var number;
var guesses = 0;
var minNumber = 1;
var maxNumber = 100;

function resetGame(){
  number = findNewNumber();
  guesses = 0;
  resetInputLimits();
  updateLastGuessResult('');
  updateLastGuess('');
  disableReset(true);
  disableClear(true);
  updateGuessInput('');
  updateNote('');
  updateMinMax();
  console.log('Answer is ' + number);
}

function updateMinMax(){
  $('.min-number').val(minNumber);
  $('.max-number').val(maxNumber);
}

function findNewNumber() {
  return parseInt(Math.random() * (maxNumber - minNumber) + minNumber);
}

function resetInputLimits(){
  $('.guess').attr({ 'min': minNumber, 'max': maxNumber });
}

function updateLastGuess(txt){
  $('.last-guess').text(txt);
}

function updateLastGuessResult(txt){
  $('.last-guess-result').text(txt);
}

function updateGuessInput(txt){
  $('.guess').val(txt);
}

function disableReset(tf){
  $('.reset').prop('disabled', tf);
}

function disableClear(tf){
  $('.clear').prop('disabled', tf);
}

function updateNote(note){
  $('.last-guess-note').text(note);
}

$('.guess').on('keyup click', function(){
  var currentValue = $('.guess').val();
  if(currentValue === ''){
    disableClear(true);
  } else {
    disableClear(false);
  }
});

$('.submit-guess').on('click', function(e){
  e.preventDefault();
  startCheckGuess();
});

function startCheckGuess(){
  let guess = parseInt($('.guess').val());
  if (guess > maxNumber || guess < minNumber) {
    updateLastGuessResult('Number out of range');
  } else if (guess >= minNumber || guess <= maxNumber) {
    updateLastGuess(guess);
    updateNote('Your last guess was');
    checkGuess(guess);
    guesses += 1;
    $('.guess').val('');
    $('.reset').prop('disabled', false);
    $('.clear').prop('disabled', true);
  } else {
    updateLastGuess('Invalid guess');
  }
}

$('.clear').on('click', function(e){
  e.preventDefault();
  updateGuessInput('');
  disableClear(true);
});

$('.reset').on('click', function(e){
  e.preventDefault();
  resetGame();
})

function checkGuess(guess){
  var answer = '';
  if(guess > number){
    answer = 'That is too high';
  } else if(guess < number){
    answer = 'That is too low';
  } else {
    answer = 'BOOM!';
    updateNote('Max/min increased by 20');
    maxNumber += 10;
    minNumber -= 10;
  }
  updateLastGuessResult(answer)
}

$('.change-range').on('click', function(e){
  e.preventDefault();
  minNumber = parseInt($('.min-number').val());
  maxNumber = parseInt($('.max-number').val());
  resetGame();
})

$(document).ready(function(){
  resetGame();
});