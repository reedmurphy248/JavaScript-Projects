

buttons = document.querySelectorAll(".drum")

const drumDict = {"w": "crash", "a": "kick-bass", "s":"snare", "d":"tom-1", "j":"tom-2", "k":"tom-3", "l":"tom-4"}

for(i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function(){
        buttonType = this.textContent;
        drum(buttonType);
        buttonAnimation(buttonType);
    });
}

document.addEventListener("keydown", function(event){
    drum(event.key);
    buttonAnimation(event.key);
})

function drum(drum_type){
    var audio = new Audio(`sounds/${drumDict[drum_type]}.mp3`);
    audio.play();
}

function buttonAnimation(currentKey){
    document.querySelector(`.${currentKey}`).classList.add("pressed");
    setTimeout(function(){
        document.querySelector(`.${currentKey}`).classList.remove("pressed");
    }, 250);
    
}