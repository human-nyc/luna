document.addEventListener('DOMContentLoaded', () => {
  let formEl = document.querySelector('#login_form');
  formEl.querySelector('label[for="password"]').addEventListener('click', event => {
    formEl.classList.add('active');
  })
});
