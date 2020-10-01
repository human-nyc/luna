import Vue from 'vue';
import { mapActions } from 'vuex';
import productOptions from '../mixins/productOptions';

import { getSizedImageUrl } from "@shopify/theme-images";

Vue.component('product-grid-item', {
  props: ['currentVariantJson', 'optionsWithValuesJson', 'productJson'],
  data() {
    return {
      activeOptionIdx: null,
      colors: [],
      currentVariant: null,
      options: [],
      optionsWithValues: [],
      product: {
        variants: [],
        featured_image: "",
      },
      quantity: 1,
      quickAddIsActive: false,
      selectedColor: '',
      selectedSize: '',
      selectedWeight: '',
      selecting: 'color',
      sizes: [],
      tab: 1,
      weights: [],
    }
  },

  mounted() {
    this.currentVariant = JSON.parse(this.currentVariantJson);
    this.optionsWithValues = JSON.parse(this.optionsWithValuesJson);
    this.product = JSON.parse(this.productJson);
  },

  mixins: [productOptions],

  methods: {
    ...mapActions('cart', ['addToCart', 'hydrateCartItems', 'toggleMiniCart']),

    async submit(e) {
      const { id } = this.selectedVariant;
      const properties = {};
      const quantity = this.quantity;
      const cartData = { id, properties, quantity };

      await this.addToCart(cartData);
      await this.hydrateCartItems();
      this.toggleMiniCart();
    },

    activateOption(optionIdx) {
      this.activeOptionIdx = optionIdx;
    },

    activateQuickAdd() {
      document.documentElement.classList.add('quick-add-active');
      this.quickAddIsActive = true;
    },

    availableOptionValues(optionIdx) {
      return this.potentialOptions[optionIdx];
    },

    deactivateQuickAdd() {
      document.documentElement.classList.remove('quick-add-active');
      this.quickAddIsActive = false;
    },
  },

  filters: {
    getSizedImageUrl(url, size) {
      return getSizedImageUrl(url, size);
    },

    handleize(value) {
      if (!value) return '';
      value = value.toString();
      return value.replace(/ /g, '-').toLowerCase();
    },
  },
});
