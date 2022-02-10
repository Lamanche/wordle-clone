import { showPlayerData, Player } from "./userdata.js";

export let playerData = {
  playerCount: 0,
  currentPlayer: 0,
};

export function saveData() {
  localStorage.setItem("playerData", JSON.stringify(playerData));
}

export function loadData() {
  const data = JSON.parse(localStorage.getItem("playerData"));

  if (data == null) return;

  Object.entries(data).forEach((key) => {
    if (key[0].match(/^[1-5]$/)) {
      key[1].addWin = function () {
        this.wins++;
      };

      key[1].addLoss = function () {
        this.losses++;
      };
    }
  });

  playerData = data;
}
