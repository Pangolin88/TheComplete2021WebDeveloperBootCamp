var gamePattern = []
var userClickedPattern = []
var start = 0
var level = 0
var buttonColours = ["red", "green", "blue", "yellow"]

function playSound(color) {
    switch (color){
        case "red":
            var redSound = new Audio("sounds/red.mp3")
            redSound.play()
            break
        case "green":
            var greenSound = new Audio("sounds/green.mp3")
            greenSound.play()
            break
        case "blue":
            var blueSound = new Audio("sounds/blue.mp3")
            blueSound.play()
            break
        case "yellow":
            var yellowSound = new Audio("sounds/yellow.mp3")
            yellowSound.play()
            break
        default:
            var wrongSound = new Audio("sounds/wrong.mp3")
            wrongSound.play()
    }
}

$(document).keypress(function () {
    start = 1
    $("h1").text("Level " + level)
    nextSequence()
})

function nextSequence() {
    userClickedPattern = []
    var randomNumber = Math.floor(Math.random() * 4)
    var randomChosenColour = buttonColours[randomNumber]
    gamePattern.push(randomChosenColour)
    playSound(randomChosenColour)
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100)
    level = level + 1
    $("h1").text("Level " + level)
}


$(".btn").click(function() {
    var userChosenColour = this.id
    playSound(userChosenColour)
    animatePress(userChosenColour)
    userClickedPattern.push(userChosenColour)
    checkAnswer()
})

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed")
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed")
    }, 100)
}

function checkAnswer() {
    if (userClickedPattern[userClickedPattern.length - 1] !== gamePattern[userClickedPattern.length - 1]){
        $("body").addClass("game-over")
        setTimeout(function() {
            $("body").removeClass("game-over")
        }, 200)
        $("h1").text("Game Over, Press Any Key to Restart")
        playSound("wrong")
        startOver()
    }else if (userClickedPattern.length === gamePattern.push()){
        setTimeout(function () {
            nextSequence()
        }, 1000)
    }
}

function startOver() {
    gamePattern = []
    start = 0
    level = 0

}
