import Flickity from 'flickity';

document.addEventListener('DOMContentLoaded', () => {
  if (document.querySelector('#featuresListSlider')) {
    let flkty = new Flickity('#featuresListSlider', {
      pageDots: false,
      prevNextButtons: true,
      fade: true,
      autoPlay: 5000,
      initialIndex: 0,
      pauseAutoPlayOnHover: true,
      watchCSS: true,
      on: {
        ready: () => {

        },
        change: () => {
        },
      }
    });
  }
});
