import Vue from 'vue';

const ProductOptions = Vue.component('product-options', {
  // props: ['product'], // declare the props
  template: `<p>I\'m the options.</p>`,
  mounted: function () {
    // Do Something?
  }
});

const product = new Vue({
  delimiters: ['${', '}'],
  el: '.product-item',
  data: {
    message: 'Hi',
  },
  components: {
    ProductOptions,
  },
});