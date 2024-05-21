const secretWord = "shell"; // hardcoded for now
const dictionary = [
  // hardcoded for now
  "party",
  "block",
  "scare",
  "watch",
  "shell",
  "clasp",
  "steer",
];
let history = [];

let currentGuess = "";

const keys = document.querySelectorAll(".keyboard-row button");
const rows = document.querySelectorAll(".row");
let turn = 0;
let currentRow;
let currentCol;

const keyboardEvent = () => {
  for (let i = 0; i < keys.length; i++) {
    keys[i].onclick = ({ target }) => {
      const key = target.getAttribute("data-key");
      if (key === "enter") {
        console.log("in enter");
        handleSubmit();
      } else if (key === "backspace") {
        console.log("in backspace");
        handleBackspace();
      } else if (currentGuess.length < 5 && currentGuess.length >= 0) {
        currentRow = rows[turn];
        currentCol = currentRow.children;
        console.log("curr col: ", currentCol);
        currentCol[currentGuess.length].innerHTML = key.toUpperCase();
        currentGuess += key;
        console.log("current guess: ", currentGuess);
      }
    };
  }
};
keyboardEvent();

const handleBackspace = () => {
  console.log("BACKSPACE");
  console.log("current guess: ", currentGuess);
  if (currentGuess.length > 0) {
    currentGuess = currentGuess.slice(0, -1);
    currentCol[currentGuess.length].innerHTML = "";
  }
};

const isValidWord = (word) => dictionary.includes(word);

const handleSubmit = () => {
  console.log("ENTER");
  if (currentGuess.length < 5) {
    console.log("not enough letters");
    shake();
  } else if (!isValidWord(currentGuess)) {
    console.log("not valid word");
    shake();
  } else {
    revealTiles();
    if (currentGuess === secretWord) {
      console.log("WIN");
    }
    history.push(currentGuess);
    currentGuess = "";
    turn++;
  }
};

const revealTiles = () => {
  currentRow.className = "row filled-row";
  let arr = Array.from(currentRow.children);
  console.log(arr);
  arr.forEach((tile) => {
    tile.style.animation = "none";
    tile.offsetHeight;
    tile.style.animation = `750ms ${
      arr.indexOf(tile) * 100 + 100
    }ms vertical-flip`;
    tile.style.animationFillMode = "both";
  });
  arr.forEach((tile) => {
    if (tile.innerHTML.toLowerCase() === secretWord[arr.indexOf(tile)]) {
      tile.style.setProperty("--reveal-colour", "#538d4e");
    } else if (secretWord.includes(tile.innerHTML.toLowerCase())) {
      // && hasn't already been used
      tile.style.setProperty("--reveal-colour", "#b59f3b");
    } else {
      tile.style.setProperty("--reveal-colour", "#3a3a3c");
    }
  });
  currentRow = rows[turn];
  currentCol = currentRow.children;
};

const shake = () => {
  currentRow.style.animation = "none";
  currentRow.offsetHeight;
  currentRow.style.animation = "shake 0.25s";
};
