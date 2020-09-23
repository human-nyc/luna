import 'flickity-as-nav-for';
import 'flickity-fade';
import Flickity from 'flickity';

document.addEventListener('DOMContentLoaded', () => {

  document.querySelectorAll('.shopify-section-press').forEach(sectionEl => {

    const pressLogosEl = sectionEl.querySelector('.press__logos');
    const pressQuotesEl = sectionEl.querySelector('.press__quotes');
    
    new Flickity(pressLogosEl, {
      contain: true,
      pageDots: false,
      prevNextButtons: false,
      autoPlay: true,
      asNavFor: pressQuotesEl
    });

    new Flickity(pressQuotesEl, {
      fade: true,
      pageDots: false,
      prevNextButtons: false,
      asNavFor: pressLogosEl,
      wrapAround: true
    });
  });
});
