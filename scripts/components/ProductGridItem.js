import Vue from 'vue';
import { getSizedImageUrl } from "@shopify/theme-images";


const ProductGridItem = Vue.component('product-grid-item', {
  props: ['product-json','options-with-values-json', 'first-available-variant-id'],
  methods: {
    activateQuickAdd() {
      this.quickAddIsActive = true;
    },
    respondToChange() {
    },
    handleOptionChange({optionIdx}) {
      console.log({optionIdx});

      // this.options.forEach((option, idx) => {
      //   if(idx > optionIdx) {
      //     this.options[idx] = undefined;
      //   }
      // });

      this.options = this.options.filter((option, idx) => idx <= optionIdx);
    }
  },
  data() {
    return {
      product: {},
      options: [],
      quickAddIsActive: false
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
        id: `product${product.id}_option${option.name}_value${value.replace(' ', '-')}`,
        key: `"product${product.id}_option${option.name}_value${value.replace(' ', '-')}`
      })
    },
    labelOptionAttributes() {
      return (product, option, value) => ({
        for: `product${product.id}_option${option.name}_value${value.replace(' ', '-')}`,
        class: `option option--${option.name.toLowerCase()} option--${value.replace(' ', '-').toLowerCase()}`
      })
    },
    optionsWithValues() {
      return JSON.parse(this.optionsWithValuesJson)
    },
    selectedVariant: {
      get() {
        if(this.product.variants) {
          var result = this.product.variants.filter(variant => {
            return this.options.every((option, index) => {
              return variant.options[index] === option;
            });
          });

          return result[0] || null;
        } else {
          return { id: 'stevie' };
        }
      },
      set(value) {
        return this.product.variants.find(variant => variant.id == value);
      }
    },
  },
  filters: {
    handleize(value) {
      if (!value) return '';
      value = value.toString();
      return value.replace(' ', '-').toLowerCase();
    },
    getSizedImageUrl(url, size) {
      console.log({url, size});
      return getSizedImageUrl(url, size);
    }
  },
})

export default ProductGridItem;
