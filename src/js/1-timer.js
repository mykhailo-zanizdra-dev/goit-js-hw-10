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

const prepareDateTimeValue = value => `${value}`.padStart(2, '0');

const onClose = selectedDates => {
  selectedDate = selectedDates[0];
  timeDifference = selectedDate - new Date();

  if (timeDifference <= 0) {
    iziToast.error({
      title: 'Error',
      message: 'The chosen date and time must be in the future.',
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
    return;
  }
  startButton.classList.remove('disabled');
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
    const now = new Date();
    const remainingTime = selectedDate - now;

    dayLabel.textContent = prepareDateTimeValue(
      Math.floor(remainingTime / (1000 * 60 * 60 * 24))
    );
    hourLabel.textContent = prepareDateTimeValue(
      Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    );
    minuteLabel.textContent = prepareDateTimeValue(
      Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60))
    );
    secondLabel.textContent = prepareDateTimeValue(
      Math.floor((remainingTime % (1000 * 60)) / 1000)
    );
  }, 1000);

  startButton.classList.add('disabled');
  timerInput.classList.add('disabled');
  timerInput.disabled = true;
  startButton.disabled;
});

flatpickr('input#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose,
});
