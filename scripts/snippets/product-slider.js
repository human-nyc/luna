import Vue from 'vue';
import Flickity from 'flickity';

var flkty = new Flickity('#productSlider', {
  pageDots: false,
  prevNextButtons: true,
  fade: true,
  autoPlay: 5000,
  initialIndex: 1,
  pauseAutoPlayOnHover: true,
  arrowShape: {
    x0: 10,
    x1: 60, y1: 50,
    x2: 70, y2: 40,
    x3: 30
  },
  on: {
    ready: () => {

    },
    change: () => {
    },
  }
});

const ProductOptions = Vue.component('product-options', {
  props: ['product'], // declare the props
  template: `<p>I\'m the options.</p>`,
  mounted: function () {
    // Do Something?
    console.log('Options for product: ', this.product);
  }
});

const product = new Vue({
  delimiters: ['${', '}'],
  el: '.product-item',
  data: {
    message: 'Hi',
  },
  methods: {
    addToCart: function() {

    }
  },
  components: {
    ProductOptions,
  },
});