var userClickedPattern = [];

var gamePattern = [];

var buttonColours = ["red" , "blue" , "green" , "yellow"];

var level = 0;

var started = false;


$(document).keypress(function(){
  if (!started){
    $("#level-title").text("Level: " + level);
    nextSequence();
    started = true;
  } 
});

$("#level-title").click(function(){
  if (!started){
    $("#level-title").text("Level: " + level);
    nextSequence();
    started = true;
  } 
})

$(".btn").click(function(event){
  //var userChosenColour = event.target.id;
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);

  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
})

function checkAnswer(currentLevel){
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]){
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function(){
        nextSequence();
        },1000);
      }
    }
    else{
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over , Press A Key or Click Here to Restart the Game!");

        setTimeout(function(){
        $("body").removeClass("game-over");
        },200)

        startOver();
    }
}


function nextSequence(){
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level: " + level);

  var randomNumber = Math.floor(Math.random() * 4);

  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);

}

function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");
    setTimeout(function(){
    $("#" + currentColour).removeClass("pressed");
  },100)
}

function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}
