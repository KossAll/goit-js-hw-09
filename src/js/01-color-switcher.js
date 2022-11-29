const refs = {
    btnStart: document.querySelector(`button[data-start]`),
    btnStop: document.querySelector(`button[data-stop]`),
    body: document.body,
}
let intervalId = null;

refs.btnStart.addEventListener(`click`, startChangeColor);
refs.btnStop.addEventListener(`click`, stopChangeColor);
refs.btnStop.disabled = true;

function startChangeColor() {
    refs.btnStart.disabled = true;
    refs.btnStop.disabled = false;
    intervalId = setInterval(setBodyColor, 1000);
}

function stopChangeColor() {
    refs.btnStart.disabled = false;
    refs.btnStop.disabled = true;
    clearInterval(intervalId);
    intervalId = null;
}

function setBodyColor() {
  refs.body.style.backgroundColor = getRandomHexColor();
}
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}