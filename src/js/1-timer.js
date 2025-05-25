import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let userSelectedDate = null;
let intervalId = null;
const refs = {
  inputDate: document.querySelector('#datetime-picker'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
  btnStart: document.querySelector('[data-start]'),
};

flatpickr(refs.inputDate, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] > Date.now()) {
      userSelectedDate = selectedDates[0];
      refs.btnStart.disabled = false;
    } else {
      iziToast.show({
        message: '❌ Please choose a date in the future',
        color: 'red',
        messageColor: 'red',
        position: 'topRight',
        timeout: 4000,
        progressBar: false,
        close: false,
      });
    }
  },
});

const start = () => {
  intervalId = setInterval(() => {
    const diff = userSelectedDate - Date.now();

    if (diff < 0) {
      stop();
      return;
    }

    const timeComponent = convertMs(diff);
    refs.days.textContent = pad(timeComponent.days);
    refs.hours.textContent = pad(timeComponent.hours);
    refs.minutes.textContent = pad(timeComponent.minutes);
    refs.seconds.textContent = pad(timeComponent.seconds);
  }, 1000);
};

const stop = () => {
  clearInterval(intervalId);
};

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

const pad = value => {
  return String(value).padStart(2, '0');
};

refs.btnStart.addEventListener('click', start);
