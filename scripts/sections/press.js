import 'flickity-as-nav-for';
import Flickity from 'flickity';

document.addEventListener('DOMContentLoaded', () => {

  document.querySelectorAll('.shopify-section-press').forEach(sectionEl => {

    const pressLogosEl = sectionEl.querySelector('.press__logos');
    const pressQuotesEl = sectionEl.querySelector('.press__quotes');

    const mainFlickity = new Flickity(pressLogosEl, {
      contain: true,
      pageDots: false,
      prevNextButtons: false,
      autoPlay: true,
      asNavFor: pressQuotesEl,
      wrapAround: true,
    });

    const navFlickity = new Flickity(pressQuotesEl, {
      pageDots: false,
      prevNextButtons: false,
      asNavFor: pressLogosEl,
      wrapAround: true,
    });
  });
});
