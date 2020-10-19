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

        new Flickity(shopMore, {
          autoPlay: 5000,
          imagesLoaded: true,
          pageDots: false,
          prevNextButtons: true,
          wrapAround: true,
        });
      },
    });
  });
});
