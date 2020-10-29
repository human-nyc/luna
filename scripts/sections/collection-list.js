import Flickity from 'flickity';
import 'flickity-imagesloaded';

const mediaQueryList = matchMedia('(min-width: 768px)');

document.addEventListener('DOMContentLoaded', () => {

  const initOrDestroyCarousel = (event) => {
    if (!event.matches) {
    
      document.querySelectorAll('.collection-list__items').forEach(collectionListItem => {
    
        const collectionsFlickity = new Flickity(collectionListItem, {
          adaptiveHeight: true,
          contain: true,
          imagesLoaded: true,
          pageDots: false,
          prevNextButtons: false,
          autoPlay: true,
          wrapAround: true,
        });
      });
    } else {
      if (collectionsFlickity) {
        collectionsFlickity.destroy();
      }
    }
  }
  initOrDestroyCarousel(mediaQueryList)
  mediaQueryList.addEventListener(initOrDestroyCarousel)
});
