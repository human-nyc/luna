import Vue from 'vue';

const ProductGridItem = Vue.component('product-grid-item', {
  props: ['product-json','options-with-values-json', 'first-available-variant-id'],
  methods: {
    respondToChange() {
    }
  },
  data() {
    return {
      option: {},
      selectedVariant: {}
    }
  },
  mounted() {

  },
  computed: {
    options() {
      return 'hi';
    },
    inputOptionAttributes() {
      return (product, option, value) => ({
        name: `option[${option.name}]`,
        value: value,
        id: `"product${product.id}_option${option.name}_value${value}`,
      })
    },
    labelOptionAttributes() {
      return (product, option, value) => ({
        for: `"product${product.id}_option${option.name}_value${value.replace(' ', '-')}`,
        class: `option option--${option.name}`
      })
    },
    optionsWithValues() {
      return JSON.parse(this.optionsWithValuesJson)
    },
    product() {
      return JSON.parse(this.productJson)
    },
    selectedOrFirstAvailableVariantId: {
      get() {
        return this.product.variants[1].id
      },
      set() {
        return
      },
    },
    variantId: {
      get() {
        const form = this.$el.querySelector('form');
        var options = [];

        if(form.Option1) {
          options.push(form.Option1.value);
        }

        if(form.Option2) {
          options.push(form.Option2.value)
        }

        if(form.Option3) {
          options.push(form.Option3.value)
        }

        const variantId = this.product.variants.find(variant => {
          return variant.public_title = options.join(" / ")
        }).id;

        return variantId
      }
    },
  },
  filters: {
    handleize(value) {
      if (!value) return '';
      value = value.toString();
      return value.replace(' ', '-').toLowercase();
    }
  }
})

export default ProductGridItem;
