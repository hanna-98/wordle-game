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
let currentRow = rows[history.length];
const currentCol = currentRow.children;

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
  if (currentGuess && currentGuess.length > 0) {
    currentGuess = currentGuess.slice(0, -1);
    currentCol[currentGuess.length].innerHTML = "";
  }
  console.log("current guess: ", currentGuess);
};

const isValidWord = (word) => dictionary.includes(word);

const handleSubmit = () => {
  console.log("ENTER");
  if (currentGuess === secretWord) {
    let arr = Array.from(currentRow.children);
    currentRow.className = "filled-row row";
    console.log("win");
    arr.forEach((tile) => {
      tile.className = "correct letter"; // not working as expected
      console.log("tile: ", tile);
      console.log("index: ", arr.indexOf(tile));
      tile.style.animation = `750ms ${
        arr.indexOf(tile) * 100 + 100
      }ms vertical-flip`;
    });
  }
  if (currentGuess.length < 5) {
    console.log("not enough letters");
    shake();
  } else if (!isValidWord(currentGuess)) {
    console.log("not valid word");
    shake();
  } else {
    revealTiles();
    history.push(currentGuess);
    console.log("current row: ", currentRow);
    console.log("history: ", history);
  }
};

const revealTiles = () => {
  let arr = Array.from(currentRow.children);
  console.log(arr);
  arr.forEach((tile) => {
    tile.style.animation = "vertical-flip 1s";
    if (
      arr[arr.indexOf(tile)].innerHTML ===
      secretWord[arr.indexOf(tile.innerHTML)]
    ) {
      tile.className = "correct";
      console.log("correct");
    }
  });
};

const shake = () => {
  currentRow.style.animation = "shake 0.25s"; // only works on the first submit :/
};

// variables: secretWord (const), currentGuess, history (array of guessed words), dictionary (const)
// click events: letter guess (on clicking key), word guess (on clicking enter key)
// to extend consider using wordle api

// onclick for all letters -> concatenate with currentGuess if length < 5
// onclick for backspace -> slice currentGuess
// onclick for enter -> if currentGuess length < 5 -> shake + "not enough letters" or if not valid "not a word"
