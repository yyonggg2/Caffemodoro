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
    intro: "Classic black coffee, strong and simple.",
  },
  {
    name: "Espresso",
    minutes: 15,
    caffeine: 65,
    color: "#2C1A0E",
    colorLight: "#784c35ad",
    colorDark: "#170d01",
    intro:
      'This product has proven the saying that "Concentration is essence", it serves the best along with sweet almond cookies.',
  },
  {
    name: "Latte",
    minutes: 20,
    caffeine: 75,
    color: "#7b4b1e",
    colorLight: "#a87c3f",
    colorDark: "#291b0d",
    intro:
      "Classic latte, rich and mellow, suitable for serving hot or cold, always a solid choice!",
  },
  {
    name: "Matcha Latte",
    minutes: 35,
    caffeine: 70,
    color: "#35661d",
    colorLight: "#7c9f10",
    colorDark: "#083f0e",
    intro:
      "Green is just such an empowering color! This product has perfectly combined the unique aroma of matcha and the silky smoothness of milk. With just one sip, you'll feel as though you're right there in the tea garden.",
  },
  {
    name: "Hojicha Latte",
    minutes: 45,
    caffeine: 30,
    color: "#6c4222",
    colorLight: "#dea76d",
    colorDark: "#421a06",
    intro:
      "A milder product than matcha, the deep roasting process gives it an even richer taste, best in autumn and winter.",
  },
  {
    name: "Energy Drink",
    minutes: 10,
    caffeine: 233,
    color: "#bd3807",
    colorLight: "#ef990fda",
    colorDark: "#b11478",
    intro:
      "Not enough caffeine? We've got u! Energy Drink produced specifically for Hackers! No sugar, but 300mg of caffeine! You are guaranteed a boosted night if you have it.",
  },
  {
    name: "Coke",
    minutes: 5,
    caffeine: 35,
    color: "#56a6c2",
    colorLight: "#e1e6ab",
    colorDark: "#efe709",
    intro:
      "Want a comfy drink that's sweet, sparkling, and contains a little caffeine? Hackacola has got you!",
  },
];

drinks.forEach(function (drink) {
  let btn = document.createElement("button");
  btn.innerHTML = `<span class="drink-name">${drink.name}</span><span class="drink-caffeine">${drink.caffeine} mg</span><span class="drink-time">${drink.minutes} min</span>`;
  btn.textTime = drink.minutes;
  btn.Qcaffeine = drink.caffeine;
  document.getElementById("menu-content").appendChild(btn);

  btn.addEventListener("dblclick", function () {
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

  btn.addEventListener("click", function () {
    document.querySelectorAll("#menu button").forEach(function (b) {
      b.classList.remove("selected");
    });
    btn.classList.add("selected");
  });

  btn.addEventListener("mouseenter", function () {
    if (btn.classList.contains("selected")) {
      document.getElementById("server-speech").textContent =
        `You've selected ${drink.name}! Ready to start making it?`;
    } else {
      document.getElementById("server-speech").textContent = drink.intro;
    }
  });

  btn.addEventListener("mouseleave", function () {
    document.getElementById("server-speech").textContent =
      "Welcome! Put your mouse on the menu for a drink that you are interested in! Double click the menu to select a drink~";
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
