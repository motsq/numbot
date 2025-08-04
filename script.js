
let secretCode = generateCode();
let attempt = 0;

function generateCode() {
  let digits = [];
  while (digits.length < 4) {
    let digit = Math.floor(Math.random() * 10);
    if (!digits.includes(digit)) {
      digits.push(digit);
    }
  }
  console.log("Kode Rahasia:", digits);
  return digits;
}

function submitGuess() {
  const input = document.getElementById("guessInput").value;
  if (input.length !== 4 || !/^\d+$/.test(input)) {
    alert("Masukkan 4 digit angka unik");
    return;
  }

  const guess = input.split("").map(Number);
  if (new Set(guess).size !== 4) {
    alert("Angka harus unik!");
    return;
  }

  attempt++;
  document.getElementById("attempt").textContent = attempt;
  const result = checkGuess(guess);
  addHistory(input, result.correct, result.misplaced);

  if (result.correct === 4) {
    showMessage(`Kemenangan! Kode — ${secretCode.join("")}. Upaya yang digunakan: ${attempt}`);
    disablePad();
  }

  document.getElementById("guessInput").value = "";
}

function checkGuess(guess) {
  let correct = 0;
  let misplaced = 0;

  guess.forEach((num, i) => {
    if (num === secretCode[i]) {
      correct++;
    } else if (secretCode.includes(num)) {
      misplaced++;
    }
  });

  return { correct, misplaced };
}

function addHistory(guess, correct, misplaced) {
  const history = document.getElementById("history");
  const row = document.createElement("div");
  row.className = "row";
  row.innerHTML = `<span>${guess}</span><span style="color:lime">${correct}</span><span style="color:red">${misplaced}</span>`;
  history.appendChild(row);
}

function showMessage(text) {
  const msg = document.getElementById("message");
  msg.textContent = text;
  msg.classList.remove("hidden");
}

function resetGame() {
  secretCode = generateCode();
  attempt = 0;
  document.getElementById("attempt").textContent = "0";
  document.getElementById("history").innerHTML = "";
  document.getElementById("message").classList.add("hidden");
  document.getElementById("guessInput").value = "";
  enablePad();
}

function toggleMode() {
  document.body.classList.toggle("dark-mode");
  document.body.classList.toggle("light-mode");
}

function addDigit(digit) {
  const input = document.getElementById("guessInput");
  if (input.value.length < 4 && !input.value.includes(digit)) {
    input.value += digit;
  }
}

function clearInput() {
  document.getElementById("guessInput").value = "";
}

function disablePad() {
  document.querySelectorAll(".number-pad button").forEach(btn => btn.disabled = true);
}

function enablePad() {
  document.querySelectorAll(".number-pad button").forEach(btn => btn.disabled = false);
}

function createPad() {
  const pad = document.getElementById("number-pad");
  pad.innerHTML = "";
  for (let i = 0; i <= 9; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    btn.onclick = () => addDigit(i);
    pad.appendChild(btn);
  }
}

document.getElementById("guessInput").addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    submitGuess();
  }
});

createPad();
