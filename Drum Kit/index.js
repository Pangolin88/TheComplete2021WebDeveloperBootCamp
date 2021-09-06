var tom1 = new Audio('sounds/tom-1.mp3')
var tom2 = new Audio('sounds/tom-2.mp3')
var tom3 = new Audio('sounds/tom-3.mp3')
var tom4 = new Audio('sounds/tom-4.mp3')
var snare = new Audio('sounds/snare.mp3')
var crash = new Audio('sounds/crash.mp3')
var kick = new Audio('sounds/kick-bass.mp3')

function handleClick(key){
    switch (key){
        case "w":
            tom1.play();
            break;

        case "a":
            tom2.play();
            break;

        case "s":
            tom3.play();
            break;

        case "d":
            tom4.play();
            break;

        case "j":
            snare.play();
            break;

        case "k":
            crash.play();
            break;

        case "l":
            kick.play();
            break;
        default:
            console.log(key)
    }

}

var buttons = document.querySelectorAll(".drum")

for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function () {
        handleClick(this.textContent)
        buttonAmination(this.textContent)
    })
}

document.addEventListener("keypress", function(event) {
    handleClick(event.key)
    buttonAmination(event.key)
})

function buttonAmination(currentKey){
    document.querySelector("." + currentKey).classList.add("pressed")
    setTimeout(function () {
        document.querySelector("." + currentKey).classList.remove("pressed")
    }, 100)
}