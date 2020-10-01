import Flickity from 'flickity';
import 'flickity-imagesloaded';

document.addEventListener('DOMContentLoaded', () => {

  const shopMore = document.querySelector('#shop-more');
  
  new Flickity(shopMore, {
    autoPlay: 5000,
    imagesLoaded: true,
    pageDots: false,
    prevNextButtons: true,
    wrapAround: true
  });
});
