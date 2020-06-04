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

const AddToCart = Vue.component('add-to-cart', {
  props: ['products'],
  data: function() {
    return {
      step: 0,
    };
  },
  template: (`
    <div>
      <div v-if="step === 0" class="button">
        <button @click="begin">Add to cart</button>
      </div>
      <div v-else class="add-overlay__options">
        <div class="add-overlay__option">
          <span>01. Choose your size:</span>
          <button></button><button></button>
        </div>
        <div class="add-overlay__option">
          <span>02. Choose your blanket weight:</span>
          <button></button><button></button>
        </div>
      </div>
    </div>
  `),
  mounted: function() {
    console.log('Mounted', this.product);
  },
  methods: {
    begin: function() {
      this.step += 1;
    },
  },
});

const ProductOptions = Vue.component('product-options', {
  props: ['product'], // declare the props
  template: `<div>
    <span v-for="color in colors">{{color}}</span>
  </div>`,
  data: function() {
    return {
      colors: [],
    };
  },
  mounted: function () {
    fetch('/products/' + this.product + '.json')
      .then((response) => response.json()).then(data => {
        console.log(data);
        this.productData = data.product;
        this.colors = data.product.options.find(option => option.name.toLowerCase() === 'color').values;
      });
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
    AddToCart,
  },
});