import Vue from 'vue';
import store from '../store';

import Flickity from 'flickity';
import 'flickity-imagesloaded';

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.shop-more').forEach(el => {
    var component = new Vue({
      store,
      el,
      delimiters: ['${', '}'],
      name: 'Shop More',
      mounted() {
        const shopMore = this.$el.querySelector('.shop-more__grid');

        shopMore.setAttribute('data-child-element-count', shopMore.childElementCount);

        new Flickity(shopMore, {
          cellAlign: 'left',
          autoPlay: 5000,
          imagesLoaded: true,
          pageDots: false,
          prevNextButtons: true,
          watchCSS: true,
          wrapAround: true,
        });
      },
    });
  });
});
