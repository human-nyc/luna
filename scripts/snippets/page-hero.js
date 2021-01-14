import Flickity from 'flickity'

var flickity = {
  destroy: () => {},
  resize: () => {}
};

var mediaQueryList = window.matchMedia('(min-width: 768px)');

var slideshowEl;

function screenTest({matches}) {
  flickity.destroy()

  var options = {
    pageDots: false,
    prevNextButtons: false,
    autoPlay: true,
    wrapAround: true,
  };


  if(matches) {
    options.groupCells = 2
  } else {

  }


  flickity = new Flickity(slideshowEl, options);

}




document.addEventListener('DOMContentLoaded', () => {
  slideshowEl = document.querySelector('.page-hero__images');

  screenTest(mediaQueryList);
  mediaQueryList.addListener(screenTest);

});

window.addEventListener('load', () => {
  flickity.resize();
});
