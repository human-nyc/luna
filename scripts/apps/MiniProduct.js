import Vue from 'vue';
import { mapActions } from 'vuex';

import store from '../store';
import ColorOptions, { formatColors } from '../components/ColorOptions';

const SIZE_INDEX = 0;
const COLOR_INDEX = 1;

// Components

const ProductOverlay = Vue.component('product-overlay', {
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

const ProductMini = new Vue({
  store,
  delimiters: ['${', '}'],
  el: '.product-item',
  data: {
    product: '',
    colors: [],
    currentVariant: null,
    imageUrl: null,
  },
  mounted: function () {
    this.product = this.$el.getAttribute('data-product');
    fetch('/products/' + this.product + '.json')
      .then((response) => response.json()).then(data => {
        const { product } = data;
        console.log({ product });
        this.productData = product;
        this.colors = formatColors(product);
        this.updateImage();
      });
  },
  methods: {
    ...mapActions('cart', ['addToCart', 'hydrateCartItems', 'toggleMiniCart']),
    async submit(e) {
      e.preventDefault();

      const id = this.currentVariant.id;
      const properties = {};
      const quantity = 1;
      const cartData = { id, properties, quantity };

      await this.addToCart(cartData);
      await this.hydrateCartItems();
      this.toggleMiniCart();
    },
    onChangeColor(color) {
      this.selectedColor = color;
      this.updateVariant();
    },
    updateVariant() {
      const variant = this.productData.variants
        .filter(p => {
          return p[`option${COLOR_INDEX + 1}`] === this.selectedColor;
        })[0];

      if (variant) {
        this.currentVariant = variant;
        this.updateImage()
      }
    },
    updateImage() {
      if (!this.productData) {
        return;
      }
      let image = this.productData.image;
      if (this.currentVariant) {
        image = this.productData.images.filter(p => p.id === this.currentVariant.image_id)[0];
      }
      this.imageUrl = image.src;
    },
  },
  components: {
    ProductOverlay,
    ColorOptions,
  },
});