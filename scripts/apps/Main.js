import Vue from 'vue';
import store from '../store';

document.addEventListener('DOMContentLoaded', () => {

  // Collection Page
  if (document.querySelector('#collection-page')) {
    const el = document.querySelector('#collection-page');
    new Vue({
      store,
      el,
      delimiters: ['${', '}'],
      name: 'Collection page',
    });
  }
});
