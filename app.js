let seconds = 25 * 60; // 25 minutes in seconds
let timerId = null;
let isRunning = false;
let selectDrinks = null;

const drinks = [
  {
    name: "Black",
    minutes: 25,
    caffeine: 95,
    color: "#2a2929",
    colorLight: "#C4956A",
    colorDark: "#4B3C2A",
  },
  {
    name: "Espresso",
    minutes: 15,
    caffeine: 65,
    color: "#2C1A0E",
    colorLight: "#784c35ad",
    colorDark: "#170d01",
  },
  {
    name: "Latte",
    minutes: 20,
    caffeine: 75,
    color: "#7b4b1e",
    colorLight: "#a87c3f",
    colorDark: "#291b0d",
  },
  {
    name: "Matcha",
    minutes: 35,
    caffeine: 70,
    color: "#35661d",
    colorLight: "#7c9f10",
    colorDark: "#083f0e",
  },
  {
    name: "Hojicha",
    minutes: 45,
    caffeine: 30,
    color: "#6c4222",
    colorLight: "#dea76d",
    colorDark: "#421a06",
  },
  {
    name: "Energy Drink",
    minutes: 10,
    caffeine: 233,
    color: "#bd3807",
    colorLight: "#ef990fda",
    colorDark: "#b11478",
  },
  {
    name: "Coke",
    minutes: 5,
    caffeine: 35,
    color: "#56a6c2",
    colorLight: "#e1e6ab",
    colorDark: "#efe709",
  },
];

drinks.forEach(function (drink) {
  let btn = document.createElement("button");
  btn.innerHTML = `<span class="drink-name">${drink.name}</span><span class="drink-caffeine">${drink.caffeine} mg</span><span class="drink-time">${drink.minutes} min</span>`;
  btn.textTime = drink.minutes;
  btn.Qcaffeine = drink.caffeine;
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
  document.getElementById("drink-timer").textContent = display;
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

// Reset button event listener
document
  .getElementById("back-to-menu-btn")
  .addEventListener("click", function () {
    clearInterval(timerId);
    isRunning = false;
    seconds = selectDrinks ? selectDrinks.minutes * 60 : 25 * 60; // reset to selected drink time or default
    updateDisplay();
  });
