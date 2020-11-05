import Flickity from 'flickity';
import 'flickity-imagesloaded';

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.collection-list__items').forEach(collectionListItem => {

    const collectionsFlickity = new Flickity(collectionListItem, {
      adaptiveHeight: true,
      contain: true,
      imagesLoaded: true,
      pageDots: false,
      prevNextButtons: true,
      autoPlay: true,
      wrapAround: true,
      watchCSS: true,
    });
  });
});
