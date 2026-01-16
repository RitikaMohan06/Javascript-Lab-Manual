let currentLight = 0;
let signalInterval = null;

const lights = [
  document.getElementById("red"),
  document.getElementById("yellow"),
  document.getElementById("green")
];

const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const addNoteBtn = document.getElementById("addNoteBtn");
const notesList = document.getElementById("notesList");

function resetLights() {
  lights.forEach(light => light.classList.remove("active"));
}

function startSignal() {
  if (signalInterval) return;

  signalInterval = setInterval(() => {
    resetLights();
    lights[currentLight].classList.add("active");
    currentLight = (currentLight + 1) % lights.length;
  }, 2000);
}

function stopSignal() {
  clearInterval(signalInterval);
  signalInterval = null;
  resetLights();
}

function addTrafficNote() {
  const noteText = prompt("Enter your traffic note:");
  if (noteText) {
    const newNote = document.createElement("li");
    newNote.textContent = noteText;
    document.querySelector("#notesList").appendChild(newNote);
  }
}

startBtn.addEventListener("click", startSignal);
stopBtn.addEventListener("click", stopSignal);
addNoteBtn.addEventListener("click", addTrafficNote);