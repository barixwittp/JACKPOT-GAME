let randomNum;
let count;
let numm;
let lowerBound;
let upperBound;

function startGame() {
    let level = document.getElementById("level").value;

    if (level == 1) {
        numm = 20;
        count = 20;
    } else if (level == 2) {
        numm = 50;
        count = 10;
    } else if (level == 3) {
        numm = 100;
        count = 5;
    }

    randomNum = Math.floor(Math.random() * numm) + 1;
    lowerBound = 1;
    upperBound = numm;
    let gameOutput = document.getElementById("gameOutput");
    let ballsContainer = document.getElementById("ballsContainer");

    // Clear previous balls and game output
    ballsContainer.innerHTML = "";
    gameOutput.innerText = "";

    // Re-enable the input field
    let guessInput = document.getElementById("guess");
    guessInput.disabled = false;

    // Create balls
    for (let i = 1; i <= numm; i++) {
        let ball = document.createElement("div");
        ball.classList.add("ball");
        ball.textContent = i; // Add ball number
        ballsContainer.appendChild(ball);
    }

    gameOutput.innerText = `You have ${count} attempts left.`;
}

function updateBalls(lower, upper) {
    let balls = document.querySelectorAll(".ball");
    balls.forEach((ball, index) => {
        if (index >= lower - 1 && index < upper) {
            ball.style.backgroundColor = "#0f0"; // Green
        } else {
            ball.style.backgroundColor = "#fff"; // White
        }
    });
}

window.submitGuess = function() {
    let guessInput = document.getElementById("guess");
    let guess = parseInt(guessInput.value);
    let balls = document.querySelectorAll(".ball");
    if (!isNaN(guess) && guess >= 1 && guess <= numm) {
        if (randomNum == guess) {
            gameOutput.innerText = "You won the game!";
            guessInput.disabled = true; // Disable input after winning
            balls[randomNum - 1].style.backgroundColor = "yellow"; // Highlight the correct answer in yellow
            setTimeout(function() {
                let playAgain = confirm("You won the game! Do you want to play again?");
                if (playAgain) {
                    startGame(); // Restart the game
                }
            }, 1000); // Wait for 1 second before showing the confirm dialog
            return; // End the game immediately
        } else if (randomNum < guess) {
            document.getElementById("hint").innerText = `Hint: The jackpot is less than ${guess}`;
            upperBound = guess - 1;
        } else {
            document.getElementById("hint").innerText = `Hint: The jackpot is greater than ${guess}`;
            lowerBound = guess + 1;
        }
        updateBalls(lowerBound, upperBound);
        guessInput.value = "";
        count--; // Decrement chances
        gameOutput.innerText += `\nYou have ${count} attempts left.`; // Update remaining chances
    } else {
        alert("Please enter a valid number between 1 and " + numm);
    }
    if (count === 0) {
        gameOutput.innerText += "\nYou lost the game. The answer was " + randomNum;
        balls[randomNum - 1].style.backgroundColor = "yellow"; // Highlight the correct answer in yellow
        setTimeout(function() {
            let playAgain = confirm("You lost the game. Do you want to play again?");
            if (playAgain) {
                startGame(); // Restart the game
            }
        }, 1000); // Wait for 1 second before showing the confirm dialog
    }
};


