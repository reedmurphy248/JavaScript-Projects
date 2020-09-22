
const diceRollP1 = Math.floor(Math.random() * 6) + 1;;
const diceRollP2 = Math.floor(Math.random() * 6) + 1;;

document.querySelector(".img1").setAttribute("src", `images/dice${diceRollP1}.png`);
document.querySelector(".img2").setAttribute("src", `images/dice${diceRollP2}.png`);

if (diceRollP1 > diceRollP2) {
    document.querySelector("h1").textContent = "Player 1 Wins!!!"
} else if (diceRollP1 < diceRollP2) {
    document.querySelector("h1").textContent = "Player 2 Wins!!!"
} else {
    document.querySelector("h1").textContent = "It's a draw!!!"
}