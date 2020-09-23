import Vue from 'vue';
import store from '../store';

document.addEventListener('DOMContentLoaded', () => {

  // Collection Page
  if (document.querySelector('#collection-page')) {
    const { id } = document.querySelector('#collection-page');
    new Vue({
      store,
      el: `#${id}`,
      delimiters: ['${', '}'],
      name: 'Collection page',
    });
  }
  // Product Suggestion Section
  if (document.querySelector('.product-item')) {
    document.querySelectorAll('.product-item').forEach((el) => {
      new Vue({
        el,
        delimiters: ['${', '}'],
        store,
        name: 'Product item',
      })
    });
  }
});
