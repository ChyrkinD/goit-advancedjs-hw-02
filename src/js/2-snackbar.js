import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

const checkPromise = (delay, value) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log();
      if (value === 'fulfilled') {
        resolve(`✅ Fulfilled promise in ${delay}ms`);
      } else {
        reject(`❌ Rejected promise in ${delay}ms`);
      }
    }, delay);
  });
};

const getMessage = (message, color) => {
  iziToast.show({
    message: message,
    color: color,
    messageColor: color,
    position: 'topRight',
    timeout: 4000,
    progressBar: false,
    close: false,
  });
};

form.addEventListener('submit', event => {
  event.preventDefault();
  checkPromise(Number(form.elements.delay.value), form.elements.state.value)
    .then(message => {
      getMessage(message, 'green');
    })
    .catch(message => {
      getMessage(message, 'red');
    });

  form.reset();
});
