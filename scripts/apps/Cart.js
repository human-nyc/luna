// Cart app
import Vue from 'vue';
import store from '../store';
import { mapActions, mapGetters } from 'vuex';
import { formatMoney } from '@shopify/theme-currency';
import { getSizedImageUrl } from "@shopify/theme-images";

const selectors = {
  cartEl: '#vuecart',
};

document.addEventListener('DOMContentLoaded', () => {
  if (document.querySelector(selectors.cartEl)) {
    new Vue({
      store,
      delimiters: ['${', '}'],
      el: selectors.cartEl,
      name: 'Cart',
      mounted: async function () {
        await this.hydrateCartItems();
      },
      computed: {
        ...mapGetters('cart', [
          'cartCount',
          'cartItems',
          'cartSubtotal',
          'miniCartIsOpen',
        ]),

        getCartLevelDiscountsLength() {
          return this.cartLevelDiscounts ? this.cartLevelDiscounts.length : 0;
        },

        getItems() {
          if (this.cartCount === 1) return `${this.cartCount} Item`

          return `${this.cartCount} Items`
        },

        getLineLevelDiscounts() {
          return this.cartItems.reduce((acc, item) => {
            if (item.line_level_discount_allocations.length > 0) acc.push(item.line_level_discount_allocations);

            return acc;
          }, []).flat();
        },

        getLineLevelDiscountsLength() {
          return this.getLineLevelDiscounts.length;
        },

        getVariantColor(options = []) {
          const colorOption = [...options].find(option.name === "Color");

          return colorOption ? colorOption.value : '';
        },

        getVariantSize(options = []) {
          const sizeOption = [...options].find(option.name === "Size");

          return sizeOption ? sizeOption.value : '';
        },
      },
      methods: {
        ...mapActions('cart', [
          'changeCartItem',
          'closeMiniCart',
          'hydrateCartItems',
          'removeCartItem',
        ]),

        getSizedImageUrl(url, size) {
          return getSizedImageUrl(url, size);
        },

        getVariantColor(options = []) {
          const colorOption = [...options].find(option => option.name === "Color");

          return colorOption ? colorOption.value : '';
        },

        getVariantSize(options = []) {
          const sizeOption = [...options].find(option => option.name === "Size");

          return sizeOption ? sizeOption.value : '';
        },

        async handleQtyClick(line, quantity) {
          const itemData = { line, quantity };

          await this.changeCartItem(itemData);
        },
      },
      filters: {
        formatMoney(price, format) {
          return formatMoney(price, '${{amount}}');
        }
      }
    });
  } else {
    console.log('Vue instance of minicart did not mount');
  }
});
