let seconds = 25 * 60; // 25 minutes in seconds
let timerId = null;
let isRunning = false;
let selectedDrink = null;

const WELCOME_TEXT =
  "Welcome! Put your mouse on the menu for a drink that you are interested in! Click a drink to select it~";

const drinks = [
  {
    name: "Black",
    minutes: 25,
    caffeine: 95,
    color: "#2a2929",
    colorLight: "#C4956A",
    colorDark: "#4B3C2A",
    image: "Assets/black_coffee_final.png",
    intro: "Classic black coffee, strong and simple.",
  },
  {
    name: "Espresso",
    minutes: 15,
    caffeine: 65,
    color: "#2C1A0E",
    colorLight: "#784c35ad",
    colorDark: "#170d01",
    image: "Assets/espresso_transparent.png",
    intro:
      'This product has proven the saying that "Concentration is essence", \nit serves the best along with sweet almond cookies.',
  },
  {
    name: "Latte",
    minutes: 20,
    caffeine: 75,
    color: "#7b4b1e",
    colorLight: "#a87c3f",
    colorDark: "#291b0d",
    image: "Assets/latte_transparent.png",
    intro:
      "Classic latte, rich and mellow, \nsuitable for serving hot or cold, always a solid choice!",
  },
  {
    name: "Matcha Latte",
    minutes: 35,
    caffeine: 70,
    color: "#35661d",
    colorLight: "#7c9f10",
    colorDark: "#083f0e",
    image: "Assets/matcha_transparent.png",
    intro:
      "Green is just such an empowering color! \nThis product has perfectly combined the unique aroma of matcha and the silky smoothness of milk. \nWith just one sip, you'll feel as though you're right there in the tea garden.",
  },
  {
    name: "Hojicha Latte",
    minutes: 45,
    caffeine: 30,
    color: "#6c4222",
    colorLight: "#dea76d",
    colorDark: "#421a06",
    image: "Assets/hojicha_transparent.png",
    intro:
      "A milder product than matcha, \nthe deep roasting process gives it an even richer taste, \nbest in autumn and winter.",
  },
  {
    name: "Energy Drink",
    minutes: 10,
    caffeine: 233,
    color: "#bd3807",
    colorLight: "#ef990fda",
    colorDark: "#b11478",
    image: "Assets/energy_transparent.png",
    intro:
      "Not enough caffeine? \nWe've got u! \nEnergy Drink produced specifically for Hackers! \nNone sugar, but 300mg of caffeine! \nYou are guaranteed a boosted night if you have it.",
  },
  {
    name: "Coke",
    minutes: 5,
    caffeine: 35,
    color: "#56a6c2",
    colorLight: "#e1e6ab",
    colorDark: "#efe709",
    image: "Assets/coke_transparent.png",
    intro:
      "Want a comfy drink that's sweet, sparkling, and contains a little caffeine? \nHackacola has got you!",
  },
];

function showSpeech(text, showActions) {
  document.getElementById("server-speech-text").textContent = text;
  document
    .getElementById("server-actions")
    .classList.toggle("show", showActions);
}

function confirmDrink(drink) {
  clearInterval(timerId);
  seconds = drink.minutes * 60;
  updateDisplay();
  document.getElementById("drink-image").src = drink.image;
  document.documentElement.style.setProperty("--accent-color", drink.color);
  document.documentElement.style.setProperty(
    "--accent-color-light",
    drink.colorLight,
  );
  document.documentElement.style.setProperty(
    "--accent-color-dark",
    drink.colorDark,
  );
  document.body.classList.add("drink-selected");
  isRunning = true;
  timerId = setInterval(tick, 1000);
}

function deselectDrink() {
  document.querySelectorAll("#menu button").forEach(function (b) {
    b.classList.remove("selected");
  });
  document.getElementById("server").classList.remove("picked");
  selectedDrink = null;
  showSpeech(WELCOME_TEXT, false);
}

drinks.forEach(function (drink) {
  let btn = document.createElement("button");
  btn.innerHTML = `<span class="drink-name">${drink.name}</span><span class="drink-caffeine">${drink.caffeine} mg</span><span class="drink-time">${drink.minutes} min</span>`;
  btn.textTime = drink.minutes;
  btn.Qcaffeine = drink.caffeine;
  document.getElementById("menu-content").appendChild(btn);

  btn.addEventListener("click", function () {
    document.querySelectorAll("#menu button").forEach(function (b) {
      b.classList.remove("selected");
    });
    btn.classList.add("selected");
    selectedDrink = drink;
    document.getElementById("server").classList.add("picked");
    showSpeech(
      `You've selected ${drink.name}! Ready to start making it?`,
      true,
    );
  });

  btn.addEventListener("mouseenter", function () {
    if (btn.classList.contains("selected")) {
      showSpeech(
        `You've selected ${drink.name}! Ready to start making it?`,
        true,
      );
    } else {
      showSpeech(drink.intro, false);
    }
  });

  btn.addEventListener("mouseleave", function () {
    if (selectedDrink) {
      showSpeech(
        `You've selected ${selectedDrink.name}! Ready to start making it?`,
        true,
      );
    } else {
      showSpeech(WELCOME_TEXT, false);
    }
  });
});

document.getElementById("yes-btn").addEventListener("click", function () {
  if (selectedDrink) confirmDrink(selectedDrink);
});

document.getElementById("no-btn").addEventListener("click", function () {
  deselectDrink();
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
    document.body.classList.remove("drink-selected");
    seconds = 25 * 60;
    updateDisplay();
    deselectDrink();
  });
