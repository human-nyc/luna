import Vue from 'vue';
import ColorOptions, { formatColors } from '../components/color-options';

import '../components/color-options'; // Would like to remove... but need for export..
import '../sections/header';
import '../snippets/features-list';
import '../sections/product-steps';

const productForm = new Vue({
  delimiters: ['${', '}'],
  el: '#ProductForm',
  data: {
    product: {
      variants: [],
    },
    options: [],
    colors: [],
    sizes: [],
    weights: [],
    selectedSize: '',
    selectedColor: '',
    tab: 1,
    quantity: 1,
    selecting: 'color',
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
    this.colors = this.options[1].values.map(option => option.value);
  },
  methods: {
    onChangeColor: function(color) {
      this.selectedColor = color;
      console.log(color);
    },
    selectSize: function(event) {
      console.log('Selected size: ', event.target.value);
      this.selectedSize = event.target.value;
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
  },
  components: {
    ColorOptions,
  },
});
