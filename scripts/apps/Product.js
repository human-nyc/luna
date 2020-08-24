import Vue from 'vue';
import { formatMoney } from '@shopify/theme-currency'
import { getSizedImageUrl } from "@shopify/theme-images";
import querystring from 'querystring';
import { mapActions } from 'vuex';

import store from '../store';

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
          variants: []
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
      },
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

        handleOptionChange({ optionIdx }) {
          this.options = this.options.filter((option, idx) => {
            return idx <= optionIdx
          });
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
      computed: {
        selectedVariant: {
          get() {
            if (this.product.variants) {
              let result = this.product.variants.filter(variant => {
                return this.options.every((option, index) => {
                  return variant.options[index] === option;
                });
              });

              if (result.length > 0) {
                let getVars = querystring.parse(location.search.substr(1));
                getVars['variant'] = result[0].id;

                const url = `${window.location.pathname}?${querystring.stringify(getVars)}`;
                history.replaceState({}, '', url);
              }

              return result[0] || null;
            } else {
              return { id: null, price: 0, compare_at_price: 0, featured_image: { src: '' } };
            }
          },
          set(value) {
            return this.product.variants.find(variant => variant.id == value);
          }
        },

        optionAttributes() {
          return (option, optionIdx) => ({
            class: [
              'product_option',
              `option--${option.name.toLowerCase()}`,
              { active: optionIdx == this.activeOptionIdx }
            ]
          })
        },

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
            class: `option-value  option--${value.replace(' ', '-').toLowerCase()}`
          })
        },

        potentialVariants() {
          if (this.product.variants) {
            let result = this.product.variants.filter(variant => {
              const optionsArr = this.options;

              return optionsArr.every((option, index) => {
                return option === variant.options[index];
              });
            });

            return result;
          } else {
            return null;
          }
        },

        potentialOptions1() {
          if (this.options[0] && this.product.variants) {
            return new Set(this.product.variants.reduce((acc, curr) => {
              if (curr.options[0] === this.options[0]) acc.push(curr.options[1]);
              return acc
            }, []));
          }

          return new Set(this.potentialVariants.map(variant => variant.options[1]));
        },

        potentialOptions2() {
          if (this.options[1] && this.product.variants) {
            return new Set(this.product.variants.reduce((acc, curr) => {
              if (
                curr.options[0] === this.options[0]
                && curr.options[1] === this.options[1]
              ) acc.push(curr.options[2]);
              return acc
            }, []));
          }

          return new Set(this.potentialVariants.map(variant => variant.options[2]));
        },

        potentialOptions() {
          if (this.product.variants) {
            let potentialOptions = [this.optionsWithValues[0].values];

            if (this.options[0]) potentialOptions.push([...this.potentialOptions1])
            if (this.options[1]) potentialOptions.push([...this.potentialOptions2].sort());

            return potentialOptions;
          } else {
            return null;
          }
        }
      },

      filters: {
        getSizedImageUrl(url, size) {
          return getSizedImageUrl(url, size);
        },

        formatMoney(price, format) {
          return formatMoney(price, '${{amount}}');
        }
      },
    });
  }
});
