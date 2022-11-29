import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { convertMs } from './convertMs';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  input: document.querySelector('#datetime-picker'),
  button: document.querySelector('button[data-start]'),
  secondsUi: document.querySelector('[data-seconds]'),
  minutesUi: document.querySelector('[data-minutes]'),
  hoursUi: document.querySelector('[data-hours]'),
  daysUi: document.querySelector('[data-days]'),
};

let timerID = null;
let userDate = null;

refs.button.addEventListener('click', startTimer);

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if(selectedDates[0] <= options.defaultDate  ) {
            Notify.warning('Please choose a date in the future'); 
            refs.button.disabled = true;          
        }
        else {
            refs.button.disabled = false}
    },
};

const flatpi = flatpickr('#datetime-picker', options);

function startTimer(e) {
    if (e.target.nodeName === 'BUTTON'){
        timerID = setInterval(countDownTimer, 1000);
        refs.button.disabled = true;
        refs.input.disabled = true;
        }
    
     return;
}

function countDownTimer() {
  userDate = Date.parse(refs.input.value);
  const diffTime = userDate - Date.now();
  let { days, hours, minutes, seconds } = getTimeComponents(diffTime);
  if (userDate <= Date.now()) {
    clearInterval(timerID);
      refs.input.disabled = false;
  }

  if (diffTime <= 1000) {
    clearInterval(timerID);
    seconds = getTimeComponents(0).seconds;
    minutes = getTimeComponents(0).minutes;
    hours = getTimeComponents(0).hours;
    days = getTimeComponents(0).days;
      refs.input.disabled = false; 
  }
    updateCountDownUI({ seconds, minutes, hours, days });
   
}

function getTimeComponents(time) {
  return convertMs(time);
}

function updateCountDownUI({ seconds, minutes, hours, days }) {
  refs.secondsUi.textContent = seconds;
  refs.minutesUi.textContent = minutes;
  refs.hoursUi.textContent = hours;
  refs.daysUi.textContent = days;
}