import Vue from 'vue';
import store from '../store';

document.addEventListener('DOMContentLoaded', () => {
  // Collection Page
  if (document.querySelector('#shop-more')) {
    const { id } = document.querySelector('#shop-more');

    new Vue({
      store,
      el: '#shop-more',
      delimiters: ['${', '}'],
      name: 'Shop More',
    });
  }
});
