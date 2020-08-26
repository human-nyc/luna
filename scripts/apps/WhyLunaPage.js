import Vue from 'vue';

import ProductGridItem from '../components/ProductGridItem';


import store from '../store';


const CollectionPage = new Vue({
  store,
  delimiters: ['${', '}'],
  name: "CollectionPage",
  el: '#why-luna-page',
  components: {
    ProductGridItem
  },
  methods: {
  }
});
