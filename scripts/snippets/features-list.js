import Flickity from 'flickity';


const options = {
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
};

document.addEventListener('DOMContentLoaded', () => {

  document.querySelectorAll('.features-list').forEach(el => {


    let flkty = new Flickity(el.querySelector('.features-list__items'), options);

  });
});
