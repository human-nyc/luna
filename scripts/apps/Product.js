import Vue from 'vue';
import { mapActions } from 'vuex';
import store from '../store';
import productOptions from '../mixins/productOptions';

import { formatMoney } from '@shopify/theme-currency'
import { getSizedImageUrl } from "@shopify/theme-images";
import querystring from 'querystring';

document.addEventListener('DOMContentLoaded', () => {
  if (document.querySelector('#ProductHero')) {
    new Vue({
      name: "ProductHero",
      store,
      delimiters: ['${', '}'],
      el: '#ProductHero',
      data: {
        activeOptionIdx: null,
        colors: [],
        currentVariant: null,
        options: [],
        optionsWithValues: [],
        product: {
          featured_image: "",
          variants: [],
        },
        quantity: 1,
        selectedColor: '',
        selectedSize: '',
        selectedWeight: '',
        selecting: 'color',
        sizes: [],
        tab: 1,
        weights: [],
      },
      mounted() {
        this.product = JSON.parse(this.$el.dataset.product);
        this.currentVariant = JSON.parse(this.$el.dataset.currentVariant);
        this.optionsWithValues = JSON.parse(this.$el.dataset.optionsWithValues);

        if (this.currentVariant && this.currentVariant.options) this.options = this.currentVariant.options;
      },
      mixins: [productOptions],
      methods: {
        ...mapActions('cart', ['addToCart', 'hydrateCartItems', 'toggleMiniCart']),

        async submit(e) {
          e.preventDefault();
          const { id } = this.selectedVariant;
          const properties = {};
          const quantity = this.quantity;
          const cartData = { id, properties, quantity };

          await this.addToCart(cartData);
          await this.hydrateCartItems();
          this.toggleMiniCart();
        },

        activateOption(optionIdx) {
          // this.options = this.options.slice(0, optionIdx);
          this.activeOptionIdx = optionIdx;
        },

        availableOptionValues(optionIdx) {
          return this.potentialOptions[optionIdx];
        },

        selectTab: function (tab) {
          this.tab = tab;
        },

        adjustQuantity: function (increment) {
          this.quantity += increment;
          if (this.quantity < 1) {
            this.quantity = 1;
          }
        },

        focusOption: function (option) {
          this.selecting = option;
        },

        updateVariant: function () {
          const variant = this.product.variants
            .filter(p => p.options[COLOR_INDEX] === this.selectedColor)
            .filter(p => p.options[SIZE_INDEX] === this.selectedSize)[0];

          if (variant) {
            this.currentVariant = variant;
            this.replaceHistoryState();
          }
        },

        sizeName: function (size) {
          return size.split(' ')[0].toLowerCase();
        },

        sizeDimensions: function (size) {
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

      filters: {
        formatMoney(price, format) {
          return formatMoney(price, '${{amount}}');
        },

        getSizedImageUrl(url, size) {
          return getSizedImageUrl(url, size);
        },
      },
    });
  }
});
