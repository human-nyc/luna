import Vue from 'vue';

const ProductGridItem = Vue.component('product-grid-item', {
  props: ['product-json','options-with-values-json', 'first-available-variant-id'],
  methods: {
    respondToChange() {
    },
  },
  data() {
    return {
      product: {},
      selectedVariant: {
        1: null,
        2: null,
        3: null,
      },
    }
  },
  mounted() {
    this.product =  JSON.parse(this.productJson);
    // this.selectedVariant = this.product.variants.find(variant => variant.available) ? this.product.variants.find(variant => variant.available) : this.product.variants[0];
    // this.options.option1 = this.selectedVariant.option1;
    // this.options.option2 = this.selectedVariant.option2;
    // this.options.option3 = this.selectedVariant.option3;
  },
  computed: {
    inputOptionAttributes() {
      return (product, option, value) => ({
        name: `option${option.position}`,
        id: `"product${product.id}_option${option.name}_value${value.replace(' ', '-')}`,
        key: `"product${product.id}_option${option.name}_value${value.replace(' ', '-')}`
      })
    },
    labelOptionAttributes() {
      return (product, option, value) => ({
        for: `"product${product.id}_option${option.name}_value${value.replace(' ', '-')}`,
        class: `option option--${option.name}`
      })
    },
    options: {
      get() {
        return {
          1: this.selectedVariant.option1,
          2: this.selectedVariant.option2,
          3: this.selectedVariant.option3,
        }
      },
      set(value, a, b, c) {
        alert(value);
        console.log(value, a, b, c);
        return
      },
    },
    optionsWithValues() {
      return JSON.parse(this.optionsWithValuesJson)
    },
    selectedOrFirstAvailableVariantId: {
      get() {
        return
      },
      set() {
        return
      },
    },
  },
  filters: {
    handleize(value) {
      if (!value) return '';
      value = value.toString();
      return value.replace(' ', '-').toLowercase();
    },
  },
})

export default ProductGridItem;
