import { saveData, loadData, playerData } from "./storage.js";

export function Player(name) {
  this.name = name;
  this.wins = 0;
  this.losses = 0;
}

Player.prototype.addWin = function () {
  this.wins++;
};

Player.prototype.addLoss = function () {
  this.losses++;
};

document
  .querySelector(".add-new-player")
  .addEventListener("click", addNewPlayer);

export function showPlayerData() {
  if (playerData?.currentPlayer == 0 || playerData == null) {
    document.querySelector(".current-player-name").textContent = "No players";

    return;
  }
  document.querySelector(".current-player-name").textContent =
    playerData[playerData.currentPlayer]?.name;

  document.querySelector(".wins").textContent =
    playerData[playerData.currentPlayer]?.wins;

  document.querySelector(".losses").textContent =
    playerData[playerData.currentPlayer]?.losses;

  return;
}

function addNewPlayer() {
  if (playerData.playerCount >= 5) {
    return console.log("Max 5 players");
  }

  playerData.playerCount++;
  playerData.currentPlayer++;

  const input = document.querySelector(".name-input");

  playerData[playerData.currentPlayer] = new Player(input.value);

  input.value = "";

  showPlayerData();
  saveData();
}

export function addWin() {
  if (playerData.currentPlayer > 0) {
    playerData[playerData.currentPlayer].addWin();
  }
  return;
}

export function addLoss() {
  if (playerData.currentPlayer > 0) {
    playerData[playerData.currentPlayer].addLoss();
  }
  return;
}

//showPlayerData();

/**************************************************************/
