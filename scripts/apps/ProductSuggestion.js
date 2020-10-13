import Vue from 'vue';
import { mapActions, mapGetters } from 'vuex';
import store from '../store';
import productOptions from '../mixins/productOptions';

import { formatMoney } from '@shopify/theme-currency';
import { getSizedImageUrl } from '@shopify/theme-images';

document.addEventListener('DOMContentLoaded', () => {
  const el = document.querySelector('#shopify-section-product-suggestion');
  if (el) {
    new Vue({
      el,
      delimiters: ['${', '}'],
      name: "ProductSuggestion",
      store,
    });
  }
});
