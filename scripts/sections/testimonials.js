import Flickity from 'flickity'

var flkty = new Flickity('#testimonials', {
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
