import Flickity from 'flickity';
import 'flickity-imagesloaded';

document.addEventListener('DOMContentLoaded', () => {

  const shopMore = document.querySelector('#shop-more');
  
  new Flickity(shopMore, {
    // autoPlay: 3000,
    imagesLoaded: true,
    pageDots: false,
    wrapAround: true
  });
});
