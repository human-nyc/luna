import 'flickity-as-nav-for';
import Flickity from 'flickity';

document.addEventListener('DOMContentLoaded', () => {

  document.querySelectorAll('.shopify-section-press').forEach(sectionEl => {

    const pressLogosEl = sectionEl.querySelector('.press__logos');
    const pressQuotesEl = sectionEl.querySelector('.press__quotes');

    const mainFlickity = new Flickity(pressQuotesEl, {
      pageDots: false,
      prevNextButtons: false,
      wrapAround: true,
    });

    const navFlickity = new Flickity(pressLogosEl, {
      contain: true,
      draggable: false,
      pageDots: false,
      prevNextButtons: false,
      autoPlay: true,
      asNavFor: pressQuotesEl,
      wrapAround: true,
    });

  });
});
