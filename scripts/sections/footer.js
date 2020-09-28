var colorSchemeIsDark;

document.addEventListener('DOMContentLoaded', () => {
  if (sessionStorage.getItem("colorSchemeIsDark")) {
    colorSchemeIsDark = (sessionStorage.getItem("colorSchemeIsDark") === 'true');

    document.documentElement.classList.toggle('color-scheme--dark', colorSchemeIsDark);
  } else {
    const mediaQueryList = matchMedia('(prefers-color-scheme: dark)');

    darkModeTest(mediaQueryList);
  }

  const lightSwitchButtonEl = document.querySelector('#shopify-section-footer #light-switch-toggle');

  lightSwitchButtonEl.addEventListener('click', () => {
    colorSchemeIsDark = !colorSchemeIsDark;

    document.documentElement.classList.toggle('color-scheme--dark', colorSchemeIsDark);

    sessionStorage.colorSchemeIsDark = colorSchemeIsDark;
  });
});

function darkModeTest({matches}) {
  if(matches) {
    colorSchemeIsDark = true;

    document.documentElement.classList.add('color-scheme--dark');
  } else {
    colorSchemeIsDark = false;

    document.documentElement.classList.remove('color-scheme--dark');
  }
}
