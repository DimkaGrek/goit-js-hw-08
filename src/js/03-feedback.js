import throttle from 'lodash.throttle';

const formEl = document.querySelector('.feedback-form');

const obj = {
  email: '',
  message: '',
};

const saveToStorage = throttle(obj => {
  localStorage.setItem('feedback-form-state', JSON.stringify(obj));
}, 500);

formEl.addEventListener('input', onFormInput);

formEl.addEventListener('submit', onFormSubmit);

function onFormInput(e) {
  if (e.target.tagName === 'INPUT' && e.target.type === 'email') {
    obj.email = e.target.value;
    saveToStorage(obj);
  } else if (e.target.type === 'textarea') {
    obj.message = e.target.value;
    saveToStorage(obj);
  }
}

function onFormSubmit(e) {
  e.preventDefault();
  const elements = e.target.elements;
  elements.email.value = '';
  elements.message.value = '';
  localStorage.removeItem('feedback-form-state');
  console.log(obj);
}

window.onload = () => {
  const savedFormFields = localStorage.getItem('feedback-form-state');
  if (savedFormFields) {
    const parsedFormFields = JSON.parse(savedFormFields);
    const email = formEl.querySelector('[name="email"]');
    const message = formEl.querySelector('[name="message"]');
    email.value = parsedFormFields.email;
    message.value = parsedFormFields.message;
  }
};
