import Flickity from 'flickity';


document.querySelectorAll('.products-slider__main').forEach(el => {

  const flkty = new Flickity(el, {
    pageDots: false,
    prevNextButtons: true,
    fade: true,
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


});
