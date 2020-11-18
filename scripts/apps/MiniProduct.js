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
    <div class="add-overlay__">
      <div v-if="step === 0" class="add-overlay__button">
        <button type="button" @click="begin">Add to cart</button>
      </div>
      <div v-else class="add-overlay__options">
        <div class="add-overlay__option">
          <h4 class="add-overlay__option-title">
            01. Choose your size:
          </h4>
          <button>Still</button>
          <button>Need</button>
          <button>Data</button>
        </div>
        <div class="add-overlay__option">
          <h4 class="add-overlay__option-title">
            02. Choose your blanket weight:
          </h4>
          <button>Still</button>
          <button>Need</button>
          <button>Data</button>
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

const MiniProduct = new Vue({
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

export default MiniProduct;
