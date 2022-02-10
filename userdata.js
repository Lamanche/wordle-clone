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

    const stats = document.querySelector(".stats-wrapper");
    stats.classList.add("hidden");

    return;
  }

  const stats = document.querySelector(".stats-wrapper");
  stats.classList.remove("hidden");

  document.querySelector(".current-player-name").textContent =
    playerData[playerData.currentPlayer]?.name;

  document.querySelector(".wins").textContent =
    playerData[playerData.currentPlayer]?.wins;

  document.querySelector(".losses").textContent =
    playerData[playerData.currentPlayer]?.losses;

  showPlayers();

  return;
}

function showPlayers() {
  document.querySelector('.player-list')
  console.log(playerData)

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

  saveData();
  showPlayerData();

  return;
}

export function addWin() {
  if (playerData.currentPlayer > 0) {
    playerData[playerData.currentPlayer].addWin();

    saveData();
  }
  return;
}

export function addLoss() {
  if (playerData.currentPlayer > 0) {
    playerData[playerData.currentPlayer].addLoss();

    saveData();
  }
  return;
}
