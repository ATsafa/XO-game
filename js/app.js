const boxes = document.querySelectorAll(".box");
const rstBtn = document.querySelector(".rstBtn");
const status = document.querySelector(".playText");

let currentPlayer = "X";
let isGameActive = true;

let options = ["", "", "", "", "", "", "", "", ""];

const winningCondition = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const winningBlockColor = "var(--winning-blocks)"; 


boxes.forEach(box => box.addEventListener("click", () => boxClicked(box)));

rstBtn.addEventListener("click", restartGame);
displayStatus(`Player ${currentPlayer}'s turn`);

function boxClicked(box) {
    const id = box.id;

    if (!options[id] && isGameActive) {
        options[id] = currentPlayer;
        box.innerText = currentPlayer;

        if (checkWin()) {
            applyWinningBlockColor(); 
            endGame(false);
        } else if (isDraw()) {
            endGame(true);
        } else {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            displayStatus(`Player ${currentPlayer}'s turn`);
        }
    }
}

function checkWin() {
    for (const condition of winningCondition) {
        let [a, b, c] = condition;

        if (options[a] === currentPlayer && options[b] === currentPlayer && options[c] === currentPlayer) {
            return true;
        }
    }
    return false;
}

function isDraw() {
    return !options.includes("");
}

function endGame(isDraw) {
    isGameActive = false;
    if (isDraw) {
        displayStatus("It's a draw!");
    } else {
        displayStatus(`Player ${currentPlayer} wins!`);
    }
}

function restartGame() {
    options.fill("");
    currentPlayer = "X";
    isGameActive = true;
    boxes.forEach(box => {
        box.textContent = "";
        box.style.backgroundColor = ""; 
    });
    displayStatus(`Player ${currentPlayer}'s turn`);
}

function displayStatus(message) {
    status.textContent = message;
}

function applyWinningBlockColor() {
    for (const condition of winningCondition) {
        let [a, b, c] = condition;

        if (options[a] === currentPlayer && options[b] === currentPlayer && options[c] === currentPlayer) {
            boxes[a].style.backgroundColor = winningBlockColor;
            boxes[b].style.backgroundColor = winningBlockColor;
            boxes[c].style.backgroundColor = winningBlockColor;
        }
    }
}

