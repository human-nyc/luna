import 'flickity-as-nav-for';
import 'flickity-fade';
import Flickity from 'flickity';

document.addEventListener('DOMContentLoaded', () => {

  document.querySelectorAll('.shopify-section-press').forEach(sectionEl => {
    // return false;

    const pressQuotesEl = sectionEl.querySelector('.press__quotes');
    const pressLogosEl = sectionEl.querySelector('.press__logos');

    new Flickity(pressQuotesEl, {
      fade: true,
      pageDots: false,
      prevNextButtons: false,
      asNavFor: pressLogosEl,
      wrapAround: true,
    });

    new Flickity(pressLogosEl, {
      pageDots: false,
      prevNextButtons: false,
      autoPlay: true,
      // asNavFor: pressQuotesEl,
      wrapAround: true,
    });
  });
});
