import Flickity from 'flickity';

const flkty = new Flickity('#productSlider', {
  pageDots: false,
  prevNextButtons: true,
  fade: true,
  autoPlay: 5000,
  initialIndex: 1,
  pauseAutoPlayOnHover: true,
  on: {
    ready: () => {

    },
    change: () => {
    },
  }
});
