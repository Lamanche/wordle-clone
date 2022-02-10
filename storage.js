import { showPlayerData } from "./userdata.js";

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

  playerData = data;
}
