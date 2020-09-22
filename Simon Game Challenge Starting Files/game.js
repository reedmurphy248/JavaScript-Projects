var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var gameCounter = 0;
var started = false;

$("body").keydown(function(){
    if (!started){
        $("#level-title").text(`Level ${gameCounter}`);
        nextSequence();
        started = true;
    }
})

$(".btn").click(function(event){
    var userAttempt = []

    clickColor = event.target.id;
    userAttempt.push(clickColor);
    sequenceAnimation(clickColor);
    checkSequence()
})

function simon(){
    // If still playing create next sequence and test user
    nextSequence();
    // Play animation to replicate gamePattern
    for (i = 0; i < gamePattern.length; i++){
        setTimeout(function(){
            sequenceAnimation(gamePattern[i]);
            console.log(gamePattern[i]);
        }, 2000);
    }
    // Have user mimic animation
    userAttempt = []
    
    $(".btn").click(function(event){
        clickColor = event.target.id;
        userAttempt.push(clickColor);
        console.log(userAttempt);
        // If incorrect stop playing
        checkSequence();
        if (userAttempt.length == gamePattern.length){
            // If checkSequence has ran and lengths are equal they are equal
            gameCounter++;
            console.log("equal");
            simon();
        } else {
            console.log("unequal length")
        }
    })
}

function nextSequence(){
    var randomNumber = Math.floor(Math.random() * 3);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
};

function sequenceAnimation(color){
    var audio = new Audio(`sounds/${color}.mp3`);
    audio.play();
    $(`.${color}`).fadeTo("fast", 0);
    $(`.${color}`).fadeTo("fast", 100);
};

function checkSequence(){
    for (i = 0; i < userAttempt.length; i++){
        if (userAttempt[i] != gamePattern[i]){
            console.log("Not Equal")
            gameOver = true;
        }
    }
}

function playSound(color){

}
