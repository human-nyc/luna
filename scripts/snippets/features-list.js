import Flickity from 'flickity';

const options = {
  pageDots: false,
  prevNextButtons: true,
  autoPlay: 5000,
  initialIndex: 0,
  wrapAround: true,
  pauseAutoPlayOnHover: true,
  watchCSS: true,
  on: {
    ready: () => {

    },
    change: () => {
    },
  }
};

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.features-list__items').forEach(el => {
    let flkty = new Flickity(el, options);
  });
});
