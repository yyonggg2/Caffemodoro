let seconds = 25 * 60; // 25 minutes in seconds
let timerId = null;
let isRunning = false;
let selectDrinks = null;

const drinks = [
  {
    name: "Hojicha",
    minutes: 45,
    color: "#6c4222",
    colorLight: "#dea76d",
    colorDark: "#421a06",
  },
  {
    name: "Matcha",
    minutes: 35,
    color: "#35661d",
    colorLight: "#7c9f10",
    colorDark: "#083f0e",
  },
  {
    name: "Black",
    minutes: 25,
    color: "#2a2929",
    colorLight: "#C4956A",
    colorDark: "#4B3C2A",
  },
  {
    name: "Latte",
    minutes: 20,
    color: "#7b4b1e",
    colorLight: "#a87c3f",
    colorDark: "#291b0d",
  },
  {
    name: "Espresso",
    minutes: 15,
    color: "#2C1A0E",
    colorLight: "#784c35ad",
    colorDark: "#170d01",
  },
  {
    name: "Energy Drink",
    minutes: 10,
    color: "#bd3807",
    colorLight: "#ef990fda",
    colorDark: "#b11478",
  },
  {
    name: "Coke",
    minutes: 5,
    color: "#56a6c2",
    colorLight: "#e1e6ab",
    colorDark: "#efe709",
  },
];

drinks.forEach(function (drink) {
  let btn = document.createElement("button");
  btn.innerHTML = `<span class="drink-name">${drink.name}</span><span class="drink-time">${drink.minutes} min</span>`;
  btn.textTime = drink.minutes;
  document.getElementById("menu-content").appendChild(btn);

  btn.addEventListener("click", function () {
    clearInterval(timerId); // stop any existing timer
    isRunning = false;
    seconds = drink.minutes * 60; // set seconds based on drink
    updateDisplay(); // update the display immediately
    selectDrinks = drink;
    document.documentElement.style.setProperty("--accent-color", drink.color);
    document.documentElement.style.setProperty(
      "--accent-color-light",
      drink.colorLight,
    );
    document.documentElement.style.setProperty(
      "--accent-color-dark",
      drink.colorDark,
    );
  });
});

function updateDisplay() {
  let minutes = Math.floor(seconds / 60);
  let remainingSeconds = seconds % 60;
  let display =
    String(minutes).padStart(2, "0") +
    ":" +
    String(remainingSeconds).padStart(2, "0");
  document.getElementById("timer").textContent = display;
}

function tick() {
  seconds = seconds - 1;
  updateDisplay();

  if (seconds <= 0) {
    clearInterval(timerId);
    isRunning = false;
    alert("Time is up!");
  }
}

// Start button event listener
document.getElementById("start-btn").addEventListener("click", function () {
  if (isRunning) return; // if already running, do nothing
  isRunning = true;
  timerId = setInterval(tick, 1000); // start the interval, save the ID
});

// Reset button event listener
document.getElementById("reset-btn").addEventListener("click", function () {
  clearInterval(timerId);
  isRunning = false;
  seconds = selectDrinks ? selectDrinks.minutes * 60 : 25 * 60; // reset to selected drink time or default
  updateDisplay();
});
