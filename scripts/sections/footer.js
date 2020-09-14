document.addEventListener('DOMContentLoaded', () => {
  const mediaQueryList = matchMedia('(prefers-color-scheme: dark)');
  darkModeTest(mediaQueryList);
  mediaQueryList.addListener(darkModeTest);

  const lightSwitchButtonEl = document.querySelector('#shopify-section-footer #light-switch-toggle');

  lightSwitchButtonEl.addEventListener('click', () => {
    document.documentElement.classList.toggle('color-scheme--dark');
  });
});


function darkModeTest({matches}) {
  if(matches) {
    document.documentElement.classList.add('color-scheme--dark');
  } else {
    document.documentElement.classList.remove('color-scheme--dark');
  }
}
