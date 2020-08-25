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
});
