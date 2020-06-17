import Vue from 'vue';
import querystring from 'querystring';
import { mapActions } from 'vuex';

import store from '../store';
import ColorOptions from '../components/ColorOptions';

const SIZE_INDEX = 0;
const COLOR_INDEX = 1;
const WEIGHT_INDEX = 2;

const Product = new Vue({
  store,
  delimiters: ['${', '}'],
  el: '#ProductForm',
  data: {
    product: null,
    options: [],
    colors: [],
    sizes: [],
    weights: [],
    selectedSize: '',
    selectedColor: '',
    selectedWeight: '',
    tab: 1,
    quantity: 1,
    selecting: 'color',
    currentVariant: null,
  },
  mounted: function() {
    this.product = JSON.parse(this.$el.getAttribute('data-product'));
    this.currentVariant = JSON.parse(this.$el.getAttribute('data-variant'));
    this.selectedColor = this.currentVariant.options[COLOR_INDEX];
    this.selectedSize = this.currentVariant.options[SIZE_INDEX];

    this.options = this.product.options.map((name, index) => {
      let values = [];
      this.product.variants.forEach(variant => {
        const value = variant.options[index];
        if (values.includes(value)) {
          return;
        }
        values.push(value);
      });
      const products = values.map(value => ({
        value,
        variants: this.product.variants.filter(p => p.options[index] === value),
      }));
      return {
        name,
        values: products,
      };
    });
    this.colors = this.options[COLOR_INDEX].values.map(option => option.value);
    this.sizes = this.options[SIZE_INDEX].values.map(option => option.value);
    this.weights = ['20lb', '25lb', '30lb'];
  },
  methods: {
    ...mapActions('cart', ['addToCart', 'hydrateCartItems', 'toggleMiniCart']),
    async submit(e) {
      e.preventDefault();
      const id = this.currentVariant.id;
      const properties = {};
      const quantity = this.quantity;
      const cartData = { id, properties, quantity };

      await this.addToCart(cartData);
      await this.hydrateCartItems();
      this.toggleMiniCart();
    },
    onChangeColor: function(color) {
      this.selectedColor = color;
      this.updateVariant();
    },
    selectSize: function(event) {
      this.selectedSize = event.target.value;
      this.updateVariant();
    },
    selectWeight: function(event) {
      this.selectedWeight = event.target.value;
      this.updateVariant();
    },
    selectTab: function(tab) {
      this.tab = tab;
    },
    adjustQuantity: function(increment) {
      this.quantity += increment;
      if (this.quantity < 1) {
        this.quantity = 1;
      }
    },
    focusOption: function(option) {
      this.selecting = option;
    },
    updateVariant: function() {
      const variant = this.product.variants
        .filter(p => p.options[COLOR_INDEX] === this.selectedColor)
        .filter(p => p.options[SIZE_INDEX] === this.selectedSize)[0];

      if (variant) {
        this.currentVariant = variant;
        this.replaceHistoryState();
      }
    },
    sizeName: function(size) {
      return size.split(' ')[0].toLowerCase();
    },
    sizeDimensions: function(size) {
      return size.match(/\((.+?)\)/)[1];
    },
    replaceHistoryState() {
      if (!this.currentVariant) {
        return;
      }
      let getVars = querystring.parse(location.search.substring(1));
      getVars.variant = this.currentVariant.id;
      const url = `${window.location.pathname}?${querystring.stringify(getVars)}`;
      history.replaceState({}, '', url);
    },
  },
  computed: {
    price: function() {
      if (!this.product) {
        return;
      }
      let price = this.product.price;
      if (this.currentVariant) {
        price = this.currentVariant.price;
      }
      return `$${price * this.quantity / 100}`;
    },
    compareAtPrice: function() {
      if (!this.product) {
        return;
      }
      let price = this.product.compare_at_price;
      if (this.currentVariant) {
        price = this.currentVariant.compare_at_price;
      }
      return `$${price * this.quantity / 100}`;
    },
    imageUrl: function() {
      if (!this.product) {
        return;
      }
      let image = this.product.featured_image;
      if (this.currentVariant) {
        image = this.currentVariant.featured_image.src;
      }
      return image;
    }
  },
  components: {
    ColorOptions,
  },
});
