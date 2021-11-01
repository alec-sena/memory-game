const cardContainer = document.querySelector("#card-container");
const button = document.querySelector("button");

const resetGame = () => {
  window.location.reload(true);
};

button.addEventListener("click", resetGame);

const FRUITS = [
  "🍇",
  "🍇",
  "🍈",
  "🍈",
  "🍉",
  "🍉",
  "🍊",
  "🍊",
  "🍌",
  "🍌",
  "🍍",
  "🍍",
  "🍏",
  "🍏",
  "🍑",
  "🍑",
  "🍒",
  "🍒",
  "🍓",
  "🍓",
];

const shuffleArray = (arr) => {
  let tempArr = [...arr];
  const shuffledArr = [];
  while (tempArr.length > 0) {
    let idx = Math.floor(Math.random() * tempArr.length);
    shuffledArr.push(tempArr[idx]);
    tempArr.splice(idx, 1);
  }
  return shuffledArr;
};

const shuffledFruits = shuffleArray(FRUITS);

const scenes = [];
let comparison = [];

const resetComparison = () => {
  comparison.length = 0;
};

const runComparison = () => {
  let a = comparison[0];
  let b = comparison[1];

  scenes.forEach((el) => {
    el.removeEventListener("click", handleClick);
  });

  if (a.fruit === b.fruit) {
    setTimeout(() => {
      scenes.filter((el) => {
        if (el.id !== a.id && el.id !== b.id) {
          el.addEventListener("click", handleClick);
        }
      });

      let overlayA = document.getElementById(`overlay-${a.id}`);
      overlayA.classList.remove("hidden");

      let overlayB = document.getElementById(`overlay-${b.id}`);
      overlayB.classList.remove("hidden");

      resetComparison();
      // add disabled class here
    }, 1000);
  } else {
    setTimeout(() => {
      scenes[a.id].children[0].classList.toggle("is-flipped");
      scenes[b.id].children[0].classList.toggle("is-flipped");

      scenes.forEach((el) => el.addEventListener("click", handleClick));

      resetComparison();
    }, 1000);
  }
};

const addToComparison = (id) => {
  if (comparison.length < 2) {
    comparison.push({ id: id, fruit: shuffledFruits[id] });
  }
  if (comparison.length === 2) {
    runComparison();
  }
};

const flipCard = (id) => {
  let target = document.getElementById(id).children[0];
  target.classList.toggle("is-flipped");
  if (!comparison.length) {
    addToComparison(id);
  } else if (id !== comparison[0].id) {
    addToComparison(id);
  } else {
    resetComparison();
  }
};

const handleClick = (e) => {
  flipCard(e.currentTarget.id);
};

const createCard = (el, idx) => {
  let scene = document.createElement("div");
  scene.classList.add("scene");
  scene.id = idx;

  let card = document.createElement("div");
  card.classList.add("card");
  scene.appendChild(card);

  let cardFront = document.createElement("div");
  cardFront.classList.add("card-face");
  cardFront.classList.add("front");
  cardFront.innerHTML = `<p>${idx + 1}</p>`;
  card.appendChild(cardFront);

  let cardBack = document.createElement("div");
  cardBack.classList.add("card-face");
  cardBack.classList.add("back");
  cardBack.innerHTML = `<p>${el}</p>`;
  card.appendChild(cardBack);

  let overlay = document.createElement("div");
  overlay.classList.add("overlay");
  overlay.classList.add("hidden");
  overlay.id = `overlay-${idx}`;
  scene.appendChild(overlay);

  scene.addEventListener("click", handleClick);
  cardContainer.appendChild(scene);
};

const createScenesArray = () => {
  Array.from(cardContainer.children).forEach((el) => {
    scenes.push(el);
  });
};

const displayGame = (arr) => {
  arr.forEach((el, idx) => {
    createCard(el, idx);
  });
};

displayGame(shuffledFruits);
createScenesArray();