import Flickity from 'flickity'

const options = {
  pageDots: false,
  prevNextButtons: true,
  autoPlay: 5000,
  initialIndex: 1,
  pauseAutoPlayOnHover: true,
  wrapAround: true,
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
};

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.shopify-section-testimonials').forEach(initializeTestimonialsSection);
});

document.addEventListener('shopify:section:load', (event) => {
  const { detail } = event;
  const  { sectionId } = detail;

  var sectionEl = document.querySelector(`#shopify-section-${sectionId}`);
  if(sectionEl.classList.contains('shopify-section-testimonials')) {
    initializeTestimonialsSection(sectionEl);

  }
});


function initializeTestimonialsSection(el) {
  const slideshowEl = el.querySelector('.testimonials__slider');

  var flkty = new Flickity(slideshowEl, options);
}
