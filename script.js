let rounds = document.querySelector(".rounds");
let starsPlayer = document.querySelectorAll(".playerStars i");
let starsComp = document.querySelectorAll(".compStars i");
let compLine = document.querySelector("#compLine");
let compLoading = document.querySelector(".loader");
let options = document.querySelectorAll(".rock-paper-scissors");
let rstGame = document.querySelector(".rstGame");
let newGameBtn= document.querySelector(".newGame");
let resultHide= document.querySelector(".results");
let resultLine= document.querySelector(".resultLine");
let gameHidden= document.querySelector(".gameHidden");


let playerWin = 0, compWin = 0, draw = 0, roundNo = 1;
let playerHistory = { rock: 0, paper: 0, scissor: 0 };
let playerMove = "";
let compChoice = "";
let canClick = true;

newGameBtn.addEventListener("click", resetGame);
rstGame.addEventListener("click", resetGame);

function resetGame(){
    gameHidden.classList.remove("gameHidden")
    resultHide.classList.add("resultHide");
    playerWin = 0, compWin = 0, draw = 0, roundNo = 1;
    playerHistory = { rock: 0, paper: 0, scissor: 0 };
    playerMove = "";
    compChoice = "";
    canClick = true;

    compLine.innerText = "Computer Thinking... 3, 2, 1"

    starsPlayer.forEach(star => {
        star.classList.add("fa-regular");
        star.classList.remove("fa-solid");
    });

    // Reset computer stars
    starsComp.forEach(star => {
        star.classList.add("fa-regular");
        star.classList.remove("fa-solid");
    });
    rounds.innerText = "Round 1";
}

// ✅ Player Move Handling
options.forEach(option => {
    option.addEventListener("click", handlePlayerMove);
});

function handlePlayerMove(event) {
    if (!canClick) return;

    let option = event.target;
    if (option.classList.contains("rock")) playerMove = "rock";
    else if (option.classList.contains("paper")) playerMove = "paper";
    else playerMove = "scissor";

    playerHistory[playerMove]++;
    canClick = false;

    generateComputerMove();
}

// ✅ Computer Move Logic
function generateComputerMove() {
    let mostUsed = Object.keys(playerHistory).reduce((a, b) => playerHistory[a] > playerHistory[b] ? a : b);
    
    if (mostUsed === "rock") compChoice = "paper";
    else if (mostUsed === "paper") compChoice = "scissor";
    else compChoice = "rock";

    compLine.innerText = "Computer Choosed... Showing Results";
    
    compLoading.classList.add("loaderHide");

    setTimeout(checkWinner, 1000); // Delay to simulate thinking
}

// ✅ Check Winner & Update UI
function checkWinner() {
    if (
        (playerMove === "rock" && compChoice === "scissor") ||
        (playerMove === "paper" && compChoice === "rock") ||
        (playerMove === "scissor" && compChoice === "paper")
    ) {
        compLine.innerHTML = `<h2 id="compLine" style="font-size: 50px; background-color: blue; border: solid black 3px; border-radius: 40px;">Player Won</h2>`;
        playerWin++;
    } 
    else if (
        (compChoice === "rock" && playerMove === "scissor") ||
        (compChoice === "paper" && playerMove === "rock") ||
        (compChoice === "scissor" && playerMove === "paper")
    ) {
        compLine.innerHTML = `<h2 id="compLine" style="font-size: 50px; background-color: blue; border: solid black 3px; border-radius: 40px;">Computer Won</h2>`;
        compWin++;
    } 
    else {
        draw++;
        compLine.innerHTML = `<h2 id="compLine" style="font-size: 50px; background-color: blue; border: solid black 3px; border-radius: 40px;">DRAW</h2>`;
    }

    updateStars();
}

// ✅ Star Updates & New Round
function updateStars() {
    if (playerWin > 0) {
        starsPlayer[playerWin - 1].classList.remove("fa-regular");
        starsPlayer[playerWin - 1].classList.add("fa-solid");
    }
    if (compWin > 0) {
        starsComp[compWin - 1].classList.remove("fa-regular");
        starsComp[compWin - 1].classList.add("fa-solid");
    }

    if (playerWin === 3 || compWin === 3) {
        compLine.innerHTML = `<h2 id="compLine" style="font-size: 50px; background-color: blue; border: solid black 3px; border-radius: 40px;">Game Over</h2>`;
        gameHidden.classList.add("gameHidden")
        resultHide.classList.remove("resultHide");
        showResults();
    } else {
        roundNo++;
        rounds.innerText = `Round ${roundNo}`;
        setTimeout(newGame, 2000);
    }
}

function showResults(){
    if (playerWin == 3) {
        resultLine.innerText = `🎉 Congratulations!! You Won 🎉`;
    } else {
        resultLine.innerText = `❌ You Lose, Try Again!! ❌`;
    }

}


function newGame() {
    gameHidden.classList.remove("gameHidden")
    canClick = true;
    compLine.innerText = "Computer Thinking... 3, 2, 1"
}

newGame();