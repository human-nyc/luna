import Flickity from 'flickity';

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.products-slider__main').forEach(el => {

    const flkty = new Flickity(el, {
      pageDots: false,
      prevNextButtons: true,
      autoPlay: 5000,
      initialIndex: 1,
      pauseAutoPlayOnHover: true,
      wrapAround: true,
      on: {
        ready: () => {

        },
        change: () => {
        },
      }
    });

    window.addEventListener('load', () => {
      flkty.resize();
    });
  });
});
