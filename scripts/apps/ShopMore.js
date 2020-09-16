import Vue from 'vue';
import store from '../store';

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.shop-more').forEach(el => {
    new Vue({
      store,
      el,
      delimiters: ['${', '}'],
      name: 'Shop More',
    });
  });
});
