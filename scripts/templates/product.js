import Vue from 'vue';
import ColorOptions, { formatColors } from '../components/color-options';

import '../components/color-options'; // Would like to remove... but need for export..
import '../sections/header';
import '../snippets/features-list';
import '../sections/product-steps';

const COLOR_INDEX = 1;

const productForm = new Vue({
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
    tab: 1,
    quantity: 1,
    selecting: 'color',
    currentVariant: null,
  },
  mounted: function() {
    this.product = JSON.parse(this.$el.getAttribute('data-product'));
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
  },
  methods: {
    onChangeColor: function(color) {
      this.selectedColor = color;
      this.updateVariant();
    },
    selectSize: function(event) {
      this.selectedSize = event.target.value;
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
      const variant = this.product.variants.filter(p =>
        p.options[COLOR_INDEX] === this.selectedColor)[0];
      if (variant) {
        this.currentVariant = variant;
      }
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
