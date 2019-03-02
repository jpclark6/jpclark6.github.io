var number = 0;
var guesses = 0;
var minNumber = 1;
var maxNumber = 100;

function resetGame(){
  number = parseInt(Math.random() * (maxNumber - minNumber) + minNumber);
  console.log(number);
  $('.answer').text(number);
  guesses = 0;
  $('.last-guess').text('');
  $('.last-guess-result').text('');
  $('.reset').prop('disabled', true);
  $('.guess').val('');
  $('.clear').prop('disabled', true);
  $('.min-number').val(minNumber);
  $('.max-number').val(maxNumber);
  $('.low').text(minNumber);
  $('.high').text(maxNumber);
  $('.last-guess-note').text('')
}

$('.guess').on('keyup click', function(){
  var currentValue = $('.guess').val();
  if(currentValue === ''){
    $('.clear').prop('disabled', true);
    console.log('disable');
  } else {
    $('.clear').prop('disabled', false);
    console.log('enable');
  }
});

$('.submit-guess').on('click', function(e){
  e.preventDefault();
  var guess = parseInt($('.guess').val());
  if(guess > maxNumber || guess < minNumber){
    $('.last-guess-result').text('Number out of range')
  } else if(guess >= minNumber || guess <= maxNumber){
    $('.last-guess').text(guess)
    $('.last-guess-note').text('Your last guess was')
    checkGuess(guess);
    guesses += 1;
    $('.guess').val('');
    $('.reset').prop('disabled', false);
    $('.clear').prop('disabled', true);
  } else {
    $('.last-guess').text('Invalid guess')
  }
});

$('.clear').on('click', function(e){
  e.preventDefault();
  $('.guess').val('');
  $('.clear').prop('disabled', true);
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
    answer = 'BOOM! Range has been increased by 20';
    maxNumber += 10;
    minNumber -= 10;
  }
  $('.last-guess-result').text(answer);
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