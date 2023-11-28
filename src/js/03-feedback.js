import throttle from 'lodash.throttle';

const formEl = document.querySelector('.feedback-form');

let obj = {
  email: '',
  message: '',
};

const saveToStorage = throttle(obj => {
  localStorage.setItem('feedback-form-state', JSON.stringify(obj));
}, 500);

formEl.addEventListener('input', onFormInput);

formEl.addEventListener('submit', onFormSubmit);

function onFormInput(e) {
  obj[e.target.name] = e.target.value;
  saveToStorage(obj);
}

function onFormSubmit(e) {
  e.preventDefault();
  formEl.reset();
  localStorage.removeItem('feedback-form-state');
  console.log(obj);
}

window.onload = () => {
  const savedFormFields = localStorage.getItem('feedback-form-state');
  if (savedFormFields) {
    obj = JSON.parse(savedFormFields);

    // formEl.elements.email.value = obj.email;
    // formEl.elements.message.value = obj.message;

    Object.entries(obj).forEach(([key, value]) => {
      formEl.elements[key].value = value;
    });
  }
};
