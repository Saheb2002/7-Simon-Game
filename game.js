// variables and arrays

var userClickedPattern = [];
var gamePattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var firstPress = 0;
var level = 0;

// Press a key to start the game

$(document).on("keypress", function(){
  if(firstPress == 0){
    nextSequence();
    firstPress = 1;
  }
});

// Level counter

function showLevel(){
  $("h1").html("Level " + level);
}

// Random color choosed by the computer

function nextSequence(){
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  console.log(randomChosenColor);
  $("#" + randomChosenColor).fadeOut(120).fadeIn(120);
  playSound(randomChosenColor);
  level++;
  showLevel();
}

// What to do when a button clicked

$(".btn").on("click", function() {
  if(firstPress == 1){
    var userChosenColor = $(this).attr("id");
    playSound(userChosenColor);
    userClickedPattern.push(userChosenColor);
    console.log(userClickedPattern);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
  }
});

// Play sound function

function playSound(name){
    var sound = new Audio("sounds/" + name + ".mp3");
    sound.play();
  }

// Flash animation for pressed button

function animatePress(currentColor){
  $("#" + currentColor).addClass("pressed");
  setTimeout(function(){
    $("#" + currentColor).removeClass("pressed");
  },100);

}

// Check if the pressed button is according to the sequence or not

// If the answer is true

function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel] == gamePattern[currentLevel]){

    if(currentLevel == gamePattern.length-1){
      setTimeout(function(){
        nextSequence();
      },1000 );
      userClickedPattern = [];

    }

  }
  else{
    // If the answer is wrong

    var wrong = new Audio("sounds/wrong.mp3");
    wrong.play();
    $("body").addClass("game-over");
    $("h1").html("Game over, press any key to restart");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    startOver();
  }

}

// Reset the variables to restart the game

function startOver(){
  level = 0;
  firstPress = 0;
  userClickedPattern = [];
  gamePattern = [];
}
