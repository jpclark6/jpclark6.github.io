var number = 0;

function resetGame(){
  number = parseInt(Math.random() * 100);
}

$('.submit-guess').on('click', function(e){
  e.preventDefault();
  var guess = $('.guess').val();
  if(guess > 100 || guess < 1){
    $('.last-guess').text('Number out of range')
  } else {
    $('.last-guess').text(guess)
    checkGuess(guess);
  }
});

$('.clear').on('click', function(e){
  e.preventDefault();
  $('.guess').val('');
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
  }
  $('.last-guess-result').text(answer);
}

$(document).ready(function(){
  resetGame();
});