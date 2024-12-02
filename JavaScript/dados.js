const input = document.getElementById("input");
const numDice = document.getElementById("numDice");
const d4 = document.getElementById("buttond4");
const d6 = document.getElementById("buttond6");
const d8 = document.getElementById("buttond8");
const d10 = document.getElementById("buttond10");
const d12 = document.getElementById("buttond12");
const d20 = document.getElementById("buttond20");
let log = [];
const showLog = document.getElementById("showLog");

const getRandomNumber = (diceSelector) =>
  Math.floor(Math.random() * diceSelector + 1);

const writeToLog = (result) => log.push(result);

const rollDice = (sides) => {
  const count = parseInt(numDice.value) || 1;
  const results = [];
  for (let i = 0; i < count; i++) {
    results.push(getRandomNumber(sides));
  }
  return results.join(', ');
}

d4.addEventListener("click", () => {
  const result = `d4: ${rollDice(4)}`;
  input.value = result;
  writeToLog(result);
});
d6.addEventListener("click", () => {
  const result = `d6: ${rollDice(6)}`;
  input.value = result;
  writeToLog(result);
});
d8.addEventListener("click", () => {
  const result = `d8: ${rollDice(8)}`;
  input.value = result;
  writeToLog(result);
});
d10.addEventListener("click", () => {
  const result = `d10: ${rollDice(10)}`;
  input.value = result;
  writeToLog(result);
});
d12.addEventListener("click", () => {
  const result = `d12: ${rollDice(12)}`;
  input.value = result;
  writeToLog(result);
});
d20.addEventListener("click", () => {
  const result = `d20: ${rollDice(20)}`;
  input.value = result;
  writeToLog(result);
});

showLog.addEventListener("click", () => alert(log));