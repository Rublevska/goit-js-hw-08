import throttle from 'lodash.throttle';

const feedbackForm = document.querySelector('.feedback-form');
const KEY_FEEDBACK = 'feedback-form-state';
let registerData;

fillData(getStorageData());

feedbackForm.addEventListener('input', throttle(onInputClick, 500));
feedbackForm.addEventListener('submit', onSubmitClick);

function onInputClick(evt) {
  registerData[evt.target.name] = evt.target.value;
  localStorage.setItem(KEY_FEEDBACK, JSON.stringify(registerData));
}

function onSubmitClick(evt) {
  evt.preventDefault();
  if (!(registerData.email && registerData.message)) {
    alert('Заповніть обидва поля email і message');
    return;
  }
  console.log(registerData);
  localStorage.removeItem(KEY_FEEDBACK);
  fillData(getStorageData());
}

function getStorageData() {
  return (registerData = JSON.parse(localStorage.getItem(KEY_FEEDBACK)) ?? {});
}

function fillData({ email, message }) {
  feedbackForm.email.value = email ?? '';
  feedbackForm.message.value = message ?? '';
}
