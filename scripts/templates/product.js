import Vue from 'vue';

const productForm = new Vue({
  delimiters: ['${', '}'],
  el: '#productForm',
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
  },
  methods: {
    selectColor: function(color) {
      console.log('Selected color: ', color.value);
      this.selectedColor = color.value;
    },
    selectSize: function(event) {
      console.log('Selected size: ', event.target.value);
      this.selectedSize = event.target.value;
    },
  }
});