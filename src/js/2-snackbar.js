import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import iconOk from '../img/ic_ok.svg';
import iconError from '../img/ic_stop.svg';

const form = document.querySelector('.form');

form.addEventListener('submit', event => {
  event.preventDefault();
  const delay = Number(form.elements.delay.value);
  const state = form.elements.state.value;

  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  })
    .then(delay => {
      iziToast.success({
        title: 'OK',
        message: `✅ Fulfilled promise in ${delay}ms`,
        position: 'topRight',
        timeout: 3000,
        close: false,
        color: '#59A10D',
        titleColor: '#FFFFFF',
        messageColor: '#FFFFFF',
        progressBarColor: '#326101',
        iconUrl: iconOk,
        iconSize: '24px',
      });
    })
    .catch(delay => {
      iziToast.error({
        title: 'Error',
        message: `❌ Rejected promise in ${delay}ms`,
        position: 'topRight',
        timeout: 3000,
        close: false,
        color: '#EF4040',
        titleColor: '#FFFFFF',
        messageColor: '#FFFFFF',
        progressBarColor: '#B51B1B',
        iconUrl: iconError,
        iconSize: '24px',
      });
    });
  form.reset();
});
