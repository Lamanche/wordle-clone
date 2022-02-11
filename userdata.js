import { saveData, loadData, playerData } from "./storage.js";
import { flipStats } from "./script.js";

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
  .querySelector(".add-new-player-btn")
  .addEventListener("click", openInput);

document
  .querySelector(".add-player-btn")
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
  const playerList = document.querySelector(".player-list");

  playerList.innerHTML = "";

  const listItem = document.createElement("li");
  listItem.classList.add("list-item");
  listItem.classList.add("first-list-item");
  listItem.innerHTML = `<h1 class="first-h1">Name</h1><p class="first-p">Wins</p><p class="first-p first-p-2">Losses</p>`;
  playerList.append(listItem);

  const players = [];

  Object.entries(playerData).forEach((key) => {
    if (key[0].match(/^[1-5]$/)) {
      players.push(key[1]);
    }
  });

  players.forEach((player, index) => {
    const listItem = document.createElement("li");
    listItem.classList.add("list-item-container");
    listItem.setAttribute("data-index", index);
    if (playerData.currentPlayer == index + 1) {
      listItem.classList.add("highlighted-item");
    }

    const container = document.createElement("div");
    container.classList.add("list-item");
    container.addEventListener("click", switchPlayer);
    listItem.append(container);

    container.innerHTML = `      
        <h1>${player.name}</h1>
        <p>${player.wins}</p>
        <p>${player.losses}</p>
    `;
    playerList.append(listItem);

    const button = document.createElement("button");
    button.classList.add("delete-user");
    button.setAttribute("data-index", index);
    button.addEventListener("click", deletePlayer);
    button.innerHTML = "X";
    listItem.append(button);
  });
}

function switchPlayer(e) {
  let current = e.path[2].dataset.index;
  current++;

  playerData.currentPlayer = current;

  saveData();
  showPlayerData();

  flipStats();
}

function deletePlayer(e) {
  const listItems = document.querySelectorAll(".list-item-container");

  listItems.forEach((item) => {
    if (item.dataset.index == e.target.dataset.index) {
      console.log(item.dataset.index);
      item.remove();

      /**************Objektist kustutamise loogika******************************/
      /*       võta kõik võtmed objektist. kustuta indexi võti ja pane ülejäänud tagasi uuesti numbriliselt õigesti jooksma */
      delete playerData[item.dataset.index + 1];
      playerData.playerCount--;
      playerData.currentPlayer--;

      saveData();
      console.log(playerData);
    }
  });
}

function openInput() {
  if (playerData.playerCount >= 5) {
    showError();

    return;
  }

  const btn = document.querySelector(".add-new-player-btn");

  checkAddBtn();

  const input = document.querySelector(".name-input");
  input.classList.toggle("input-open");

  const inputField = document.querySelector(".input");
  setTimeout(() => {
    inputField.value = "";
  }, 200);
}

export function checkAddBtn() {
  const btn = document.querySelector(".add-new-player-btn");

  if (btn.dataset.open == "false") {
    btn.dataset.open = "true";
    btn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 455 455" style="enable-background:new 0 0 455 455;" xml:space="preserve">
        <rect fill="var(--color-tone-3)" y="212.5" width="455" height="30"/>
      </svg>
      `;
  } else {
    btn.dataset.open = "false";
    btn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 490 490" style="enable-background:new 0 0 490 490;" xml:space="preserve">
         <polygon fill="var(--color-tone-3)" points="222.031,490 267.969,490 267.969,267.969 490,267.969 490,222.031 267.969,222.031 267.969,0 222.031,0   222.031,222.031 0,222.031 0,267.969 222.031,267.969 "/>
      </svg>
    `;
  }
}

function showError() {
  const btn = document.querySelector(".add-new-player-btn");
  btn.removeEventListener("click", openInput);

  const input = document.querySelector(".new-player");

  const errorMessage = document.querySelector(".max-players-error");
  if (errorMessage != null) return;

  const error = document.createElement("p");
  error.classList.add("max-players-error");
  error.textContent = "Max 5 players";

  input.append(error);

  setTimeout(() => {
    input.addEventListener("click", openInput);
    input.removeChild(error);
  }, 1000);
}

function inputError(message) {
  const input = document.querySelector(".input");
  input.value = "";
  input.placeholder = message;
  input.classList.add("error");

  setTimeout(() => {
    input.classList.remove("input::placeholder");
    input.placeholder = "Name...";
    input.classList.remove("error");
  }, 1000);
}

function validateInput(input) {
  if (input == "") {
    return {
      type: false,
      message: "Please enter name",
    };
  } else if (input.length > 7) {
    return {
      type: false,
      message: "Max 7 characters",
    };
  }

  return { type: true };
}

function addNewPlayer() {
  const input = document.querySelector(".input");

  const validated = validateInput(input.value);

  if (validated.type == true) {
    let newCurrent = playerData.playerCount;
    newCurrent++;
    playerData.currentPlayer = newCurrent;

    playerData[newCurrent] = new Player(input.value);

    playerData.playerCount++;

    input.value = "";

    saveData();
    showPlayerData();

    checkAddBtn();

    setTimeout(() => {
      flipStats();
    }, 50);

    return;
  } else {
    inputError(validated.message);
  }
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
