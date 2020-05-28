import Flickity from 'flickity'

var flkty = new Flickity('#testimonials', {
  pageDots: false,
  prevNextButtons: true,
  fade: true,
  autoPlay: 5000,
  initialIndex: 1,
  pauseAutoPlayOnHover: true,
  arrowShape: {
    x0: 10,
    x1: 60, y1: 50,
    x2: 70, y2: 40,
    x3: 30
  },
  on: {
    ready: () => {

    },
    change: () => {
    },
  }
});
