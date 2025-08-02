import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import iconStop from '../img/ic_stop.svg';

let selectedDate;
let timeDifference;
let timer;

const startButton = document.querySelector('.start-button');
const timerInput = document.querySelector('input#datetime-picker');

const addLeadingZero = value => `${value}`.padStart(2, '0');

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

const onClose = selectedDates => {
  selectedDate = selectedDates[0];
  timeDifference = selectedDate - new Date();

  if (timeDifference <= 0) {
    iziToast.error({
      title: 'Error',
      message: 'Please choose a date in the future',
      position: 'topRight',
      timeout: 3000,
      close: true,
      color: '#EF4040',
      titleColor: '#FFFFFF',
      messageColor: '#FFFFFF',
      progressBarColor: '#B51B1B',
      iconUrl: iconStop,
      iconSize: '24px',
    });

    startButton.classList.add('disabled');
    startButton.disabled = true;
    return;
  }
  startButton.classList.remove('disabled');
  startButton.disabled = false;
};

startButton.addEventListener('click', () => {
  const dayLabel = document.querySelector('[data-days]');
  const hourLabel = document.querySelector('[data-hours]');
  const minuteLabel = document.querySelector('[data-minutes]');
  const secondLabel = document.querySelector('[data-seconds]');

  if (!timeDifference || timeDifference <= 0 || timer) {
    return;
  }

  timer = setInterval(() => {
    const remainingTime = selectedDate - new Date();

    if (remainingTime <= 0) {
      clearInterval(timer);
      timerInput.classList.remove('disabled');
      timerInput.disabled = false;
      dayLabel.textContent = '00';
      hourLabel.textContent = '00';
      minuteLabel.textContent = '00';
      secondLabel.textContent = '00';
      timer = null;
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(remainingTime);

    dayLabel.textContent = addLeadingZero(days);
    hourLabel.textContent = addLeadingZero(hours);
    minuteLabel.textContent = addLeadingZero(minutes);
    secondLabel.textContent = addLeadingZero(seconds);
  }, 1000);

  startButton.classList.add('disabled');
  startButton.disabled;
  timerInput.classList.add('disabled');
  timerInput.disabled = true;
});

flatpickr('input#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose,
});
