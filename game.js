var buttonColors = ["red", "green", "blue", "yellow"];

var userClickedPattern = [];

var gamePattern = [];

var started = false;

var level = 0;


//CHecking for first button click
$(document).keydown(function(){
  if(!started){

    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});


//Detecting button click and calling functions
$(".btn").click(function(){
  var userChosenColor = $(this).attr("id");

  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);

  animatePress(userChosenColor);

  checkAnswer(userClickedPattern.length - 1);

});



//Checking answer clicked by user
function checkAnswer(currentLevel){

  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    console.log("Success");

    if(userClickedPattern.length === gamePattern.length){
      setTimeout(function(){
        nextSequence();
      },1000);
    }

  }

  else{
    var wrongSound = new Audio("sounds/wrong.mp3");
    wrongSound.play();

    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);

    $("h1").text("Game Over, Press Any Key to Restart");

    startOver();
  }

}

function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
}

//Next Sequence
function nextSequence(){
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);

  //Random color picker
  var randomNumber = Math.floor(Math.random()*3) + 1;
  var randomChosenColor = buttonColors[randomNumber];

  //Sequence Generator
  gamePattern.push(randomChosenColor);

  //Flash
  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);


  playSound(randomChosenColor);
}


//Sound
function playSound(name){
  var sound = new Audio("sounds/" + name + ".mp3");
  sound.play();
}


//Animation
function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");

    setTimeout(function(){
      $("#" + currentColor).removeClass("pressed");
    }, 100);
}
