const cells = document.querySelectorAll(".cell");
const options = ["", "", "", "", "", "", "", "", ""];
const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
let player1 = "X";
let player2 = "O";
let currentPlayer = player1;
let timerValue1 = 60;
let timerValue2 = 60;
let currentTimerValue = 1;
let timerUpdate;

class Game {
  initializegame() {
    cells.forEach((cell) => cell.addEventListener("click", this.cellClicked));
  }

  //When each cell is clicked
  cellClicked() {
    const selectedCellId = this.getAttribute("id");
    clearInterval(timerUpdate);

    if (options[selectedCellId] != "") return;
    game.updateCell(this, selectedCellId);
    game.checkWinner();
  }

  //Update each cell with X and O
  updateCell(cell, index) {
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
    this.changePlayer();
  }

  //switch between players
  changePlayer() {
    currentPlayer =
      currentPlayer === player1
        ? (currentPlayer = player2)
        : (currentPlayer = player1);
    this.toggleTimer();
  }

  //Update the timer valuer in the UI
  updateTimer(timerValue) {
    const minutes = Math.trunc(timerValue / 60);
    const seconds = timerValue % 60;

    if (currentTimerValue === 1) {
      document.getElementById("player1-timer").textContent = `${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    } else {
      document.getElementById("player2-timer").textContent = `${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    }
  }

  decreaseTimer() {
    if (timerValue1 === 0) {
      alert("Time Over....Player2 won!");
      this.reset();
    }

    if (timerValue2 === 0) {
      alert("Time Over....Player1 won!");
      this.reset();
    }

    if (currentTimerValue === 1) {
      timerValue1 -= 1;
      this.updateTimer(timerValue1);
    }

    if (currentTimerValue === 2) {
      timerValue2 -= 1;
      this.updateTimer(timerValue2);
    }
  }

  //Toggle timer between the two playes
  toggleTimer() {
    if (currentTimerValue === 1) {
      currentTimerValue = 2;
      timerUpdate = setInterval(() => {
        this.decreaseTimer();
      }, 1000);
    } else {
      currentTimerValue = 1;
      timerUpdate = setInterval(() => {
        this.decreaseTimer();
      }, 1000);
    }
  }

  //Check the winning condition
  checkWinner() {
    let playerWon = false;
    for (let i = 0; i < winConditions.length; i++) {
      const condition = winConditions[i];
      const cellA = options[condition[0]];
      const cellB = options[condition[1]];
      const cellC = options[condition[2]];

      if (cellA === "" || cellB === "" || cellC === "") {
        continue;
      }
      if (cellA === cellB && cellB === cellC) {
        playerWon = true;
        break;
      }
    }
    if (playerWon) {
      alert("Game Over!");
      this.reset();
    }
  }

  //Start the game
  start() {
    this.initializegame();
    document.querySelector(".start").classList.add("hidden")
    currentTimerValue = 1;
    timerUpdate = setInterval(() => {
      this.decreaseTimer();
    }, 1000);
  }

  //Reset the game
  reset() {
    cells.forEach((cell) => cell.removeEventListener("click", this.cellClicked));
    clearInterval(timerUpdate);
    currentPlayer = player1;
    timerValue1 = 60;
    timerValue2 = 60;
    currentTimerValue = 1;
    document.querySelector(".start").classList.remove("hidden")
    document.getElementById("player1-timer").textContent = "01.00";
    document.getElementById("player2-timer").textContent = "01.00";
    cells.forEach((cell) => (cell.textContent = ""));
  }
}

const game = new Game();
