const billInput = document.querySelector(".calculator__bill");
const customInput = document.querySelector(".calculator__custom");
const peopleInput = document.querySelector(".calculator__people");

const tipAmount = document.querySelector(".calculator__tip--amount");
const tipTotal = document.querySelector(".calculator__tip--total");

const percent = document.querySelectorAll(".calculator__percent");

const billInvalid = document.querySelector(".bill__invalid");
const peopleInvalid = document.querySelector(".people__invalid");

let clicked;

function validateInputs() {
  let isValid = true;

  if (!billInput.value) {
    billInvalid.classList.remove("hidden");
    isValid = false;
  } else {
    billInvalid.classList.add("hidden");
  }

  if (!peopleInput.value || parseFloat(peopleInput.value) <= 0) {
    peopleInvalid.classList.remove("hidden");
    isValid = false;
  } else {
    peopleInvalid.classList.add("hidden");
  }

  return isValid;
}

function calculateTip() {
  const billValue = parseFloat(billInput.value);
  const peopleCount = parseFloat(peopleInput.value);

  let tipPercent = null;
  if (customInput.value) {
    tipPercent = parseFloat(customInput.value) / 100;
    clicked = null;
  } else if (clicked) {
    tipPercent = parseFloat(clicked.value);
  }

  if (!isNaN(tipPercent) && tipPercent > 0) {
    tipAmount.textContent = ((billValue * tipPercent) / peopleCount).toFixed(2);
    tipTotal.textContent = ((billValue * (1 + tipPercent)) / peopleCount).toFixed(2);
  }
}

window.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    if (!clicked) return;
    if (validateInputs()) calculateTip();
  }
});

document.querySelector(".calculator__grid").addEventListener("click", function (e) {
  e.preventDefault();
  clicked = e.target;

  if (!clicked.closest(".calculator__percent")) return;
  customInput.value = "";
  percent.forEach((element) => {
    element.classList.remove("clicked");
  });
  clicked.classList.add("clicked");
});

customInput.addEventListener("input", () => {
  clicked = null;
  percent.forEach((element) => element.classList.remove("clicked"));
  calculateTip();
});

document.querySelector(".reset").addEventListener("click", () => {
  billInput.value = "";
  peopleInput.value = "";
  customInput.value = "";
  tipAmount.textContent = "0.00";
  tipTotal.textContent = "0.00";
  billInvalid.classList.add("hidden");
  peopleInvalid.classList.add("hidden");
  clicked = null;
  percent.forEach((element) => element.classList.remove("clicked"));
});
