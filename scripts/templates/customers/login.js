document.addEventListener('DOMContentLoaded', (event) => {
  document.querySelector('#customer_cancel_recover_customer_password').addEventListener('click', event => {
    event.preventDefault();
    history.pushState({}, "", "/account/login");
    renderPage();
  });
});

document.addEventListener('DOMContentLoaded', renderPage);
window.addEventListener('hashchange', renderPage);

function renderPage() {
  const loginPageEl = document.querySelector('.login-page');

  if (window.location.hash === '#recover') {
    loginPageEl.setAttribute('data-mode', 'recover');
  } else {
    loginPageEl.setAttribute('data-mode', 'login');
  }
}
