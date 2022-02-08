let selectedLetters = [];

const currentWord = "there";

startGame();

function startGame() {
  document.addEventListener("keydown", (e) => pressedKeyOnKeyboard(e));

  document.querySelectorAll(".key").forEach((key) =>
    key.addEventListener("click", (e) => {
      const letter = e.target.dataset.key;
      if (letter.toLowerCase() == "delete") {
        deleteLetters();
        return;
      }
      if (letter.toLowerCase() == "enter") {
        submitAnswer();
        return;
      }
      pushSelectedLetter(letter);
    })
  );
}

/*function stopGame() {
  document.removeEventListener("keydown");

  document
    .querySelectorAll(".key")
    .forEach((key) => key.removeEventListener("click"));
}*/

function pressedKeyOnKeyboard(e) {
  document.activeElement.blur();
  if (e.key === "Delete" || e.key === "Backspace") {
    const key = document.querySelector(`[data-key='DELETE']`);
    key.focus();
    deleteLetters();
    return;
  }
  if (e.key === "Enter") {
    submitAnswer();
  }
  if (e.key.match(/^([a-z])/) && e.key.length === 1) {
    const key = document.querySelector(`[data-key='${e.key.toUpperCase()}']`);
    const letter = key.dataset.key;
    key.focus();
    pushSelectedLetter(letter);
    return;
  }
  return;
}

function pushSelectedLetter(letter) {
  if (selectedLetters.length >= 5) return;
  selectedLetters.push(letter);
  displayLetter(letter);
}

function displayLetter(letter) {
  const tile = document.querySelector('[data-tile-active="false"]');
  tile.dataset.tileActive = "true";
  tile.textContent = letter;
  tile.classList.add("tile-active");
  tile.classList.add("fill-tile");
  tile.addEventListener("animationend", () => {
    tile.classList.remove("fill-tile");
  });
}

function deleteLetters() {
  const activeTiles = document.querySelectorAll('[data-tile-active="true"]');
  if (selectedLetters.length >= 1) {
    const tileToDelete = activeTiles[selectedLetters.length - 1];
    tileToDelete.dataset.tileActive = "false";
    tileToDelete.textContent = "";
    tileToDelete.classList.remove("tile-active");
    selectedLetters.pop();
    return;
  }
  return;
}

function submitAnswer() {
  const activeTiles = document.querySelectorAll('[data-tile-active="true"]');
  if (selectedLetters.length < 5) {
    showMessage("Not enough letters");
    activeTiles.forEach((tile) => tile.classList.add("error"));
    const emptyTilesCount = 5 - selectedLetters.length;
    const emptyTilesAll = [
      ...document.querySelectorAll('[data-tile-active="false"]'),
    ];
    const emptyTiles = emptyTilesAll.slice(0, emptyTilesCount);
    emptyTiles.forEach((tile) => tile.classList.add("error"));

    setTimeout(() => {
      activeTiles.forEach((tile) => tile.classList.remove("error"));
      emptyTiles.forEach((tile) => tile.classList.remove("error"));
    }, 300);
    return;
  } else if ((selectedLetters.length = 5)) {
    checkAnswer(activeTiles);
  }
}

function checkAnswer(activeTiles) {
  //console.log(selectedLetters);

  let matchCount = 0;  
  const word = [...currentWord];
  
  selectedLetters.forEach((letter, index) => {
    
    setTimeout(() => {
      activeTiles[index].classList.add("flip");
    }, (index * 500) / 2);

    activeTiles[index].addEventListener("transitionend", () => {
      activeTiles[index].classList.remove("flip");
      activeTiles[index].dataset.tileActive = "locked";
     
      if (word[index].toLowerCase() === letter.toLowerCase()) {
        activeTiles[index].classList.add("match");
        const key = document.querySelector(
          `[data-key='${letter}'i]`
        );
        key.classList.add("match");
        key.setAttribute("data-selected", "true");
        matchCount++;
        
        if (matchCount == 10) {
          showMessage("Yay!");
          matchCount = 0;
          selectedLetters = [];

          clearTable();
          //console.log(matchCount);
          return;
        }
      } else if (currentWord.includes(letter.toLowerCase())) {
        activeTiles[index].classList.add("includes");
        const key = document.querySelector(
          `[data-key='${letter}'i]`
        );
        key.classList.add("includes");
        key.setAttribute("data-selected", "true");
      } else {
        activeTiles[index].classList.add("dont-include");
        const key = document.querySelector(
          `[data-key='${letter}'i]`
        );
        key.classList.add("dont-include");
        key.setAttribute("data-selected", "true");
      }
    });
  });
  selectedLetters = [];
}

function showMessage(m) {
  const messageContainer = document.querySelector(".message-container");
  const message = document.createElement("div");
  message.classList.add("message");
  message.textContent = m;
  messageContainer.prepend(message);
  message.addEventListener("animationend", () => {
    message.remove();
  });
}

function clearTable() {
  const activeKeys = document.querySelectorAll('[data-selected="true"]');
  const activeTiles = document.querySelectorAll('[data-tile-active="locked"]');

  setTimeout(() => {
    activeTiles.forEach((tile) => {
      //tile.dataset.tileActive = "false";      
      tile.className = "tile";
      tile.textContent = "";
    });

    activeKeys.forEach((key) => {
      key.className = "key";
      delete key.dataset.selected;
    });
  }, 1200);

 //console.log(selectedLetters);
}
