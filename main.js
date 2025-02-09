// script.js

let showInstructions = true;
let fadeOut = false;
let options = []; 
let score = 0;
let gameStatus = "";
let targetColor = generateRandomColor();

const instructionsDiv = document.getElementById("instructions");
const gameDiv = document.getElementById("game");
const scoreDisplay = document.getElementById("score");
const colorBox = document.getElementById("colorBox");
const colorOptionsDiv = document.getElementById("colorOptions");
const gameStatusDiv = document.getElementById("gameStatus");
const playButton = document.getElementById("playButton");
const newGameButton = document.getElementById("newGameButton");

function generateRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return { r, g, b };
}

function generateColorOptions(targetColor) {
    const { r, g, b } = targetColor;
    colorBox.style.backgroundColor = `rgb(${r}, ${g}, ${b})`
    const options = new Set();

    const perturbColor = (value) =>
        Math.max(0, Math.min(255, value + Math.floor(Math.random() * 50) - 25));

    options.add(`rgb(${r}, ${g}, ${b})`);

    while (options.size < 6) {
        const newColor = `rgb(${perturbColor(r)}, ${perturbColor(g)}, ${perturbColor(b)})`;
        options.add(newColor);
    }

    return Array.from(options).sort(() => Math.random() - 0.5);
}

function startNewRound() {
  colorBox.style.backgroundColor = 
    targetColor = generateRandomColor();
    options = generateColorOptions(targetColor);
    renderColorOptions();
}

function handleGuess(color) {
    if (gameStatus === "You Lost! Game Over" || gameStatus === "You Won! Congratulations") {
        return;
    }
    if (color === `rgb(${targetColor.r}, ${targetColor.g}, ${targetColor.b})`) {
        score += 5;
       
            gameStatus = "Correct!";
            startNewRound();
        
    } else {
        score -= 2;
        
            gameStatus = "Wrong! Try again.";
        
    }
    updateGameStatus();
}

function updateGameStatus() {
    scoreDisplay.textContent = `Score: ${score}`;
    gameStatusDiv.textContent = gameStatus;
}

function renderColorOptions() {
    colorOptionsDiv.innerHTML = ""; // Clear previous options
    options.forEach((color) => {
        const button = document.createElement("button");
        button.className = "options";
        button.style.backgroundColor = color;
        button.onclick = () => handleGuess(color);
        colorOptionsDiv.appendChild(button);
    });
}

function startGame() {
    instructionsDiv.style.display = "none"; // Hide instructions
    gameDiv.style.display = "block"; // Show game
    score = 0; // Reset score
    gameStatus = ""; // Reset game status
    updateGameStatus(); // Update display
    startNewRound(); // Start the first round
}

function handleNewGame() {
    score = 0; // Reset score
    gameStatus = ""; // Reset game status
    updateGameStatus(); // Update display
    startNewRound(); // Start a new round
}

// Event Listeners
playButton.addEventListener("click", startGame);
newGameButton.addEventListener("click", handleNewGame);