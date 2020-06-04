import Vue from 'vue';
import Flickity from 'flickity';
import ColorOptions, { formatColors } from '../components/color-options';

const flkty = new Flickity('#productSlider', {
  pageDots: false,
  prevNextButtons: true,
  fade: true,
  autoPlay: 5000,
  initialIndex: 1,
  pauseAutoPlayOnHover: true,
  on: {
    ready: () => {

    },
    change: () => {
    },
  }
});

// Components

const AddToCart = Vue.component('add-to-cart', {
  props: ['product'],
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

// Instance

const product = new Vue({
  delimiters: ['${', '}'],
  el: '.product-item',
  data: {
    product: '',
    colors: [],
  },
  mounted: function () {
    this.product = this.$el.getAttribute('data-product');
    fetch('/products/' + this.product + '.json')
      .then((response) => response.json()).then(data => {
        const { product } = data;
        console.log({ product });
        this.productData = product;
        this.colors = formatColors(product);
      });
  },
  methods: {
    addToCart: function() {

    },
    onChangeColor: function(color) {
      console.log('New color is: ', color);
    },
  },
  components: {
    AddToCart,
    ColorOptions,
  },
});