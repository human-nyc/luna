// Cart app
import Vue from 'vue';
import store from '../store';
import { mapActions, mapGetters } from 'vuex';
import productOptions from '../mixins/productOptions';
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
      data: {
        activeOptionIdx: null,
        currentVariant: null,
        hasUpsell: false,
        isUpsellActive: false,
        options: [],
        optionsWithValues: [],
        quantity: 1,
        tab: 1,
        upsell: {},
      },
      mounted: async function () {
        await this.hydrateCartItems();

        if (this.cartCount == 0) return;

        const itemsWithUpsell = this.cartItems.filter(({ handle }) => window.upsells[handle]);

        this.setUpsellBlock(itemsWithUpsell);
      },
      mixins: [productOptions],
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

        product() {
          return this.upsell;
        },

        upsellUrl() {
          return this.upsell.handle ? `/products/${this.upsell.handle}` : '';
        },
      },
      methods: {
        ...mapActions('cart', [
          'addToCart',
          'changeCartItem',
          'closeMiniCart',
          'hydrateCartItems',
          'removeCartItem',
        ]),

        activateOption(optionIdx) {
          this.activeOptionIdx = optionIdx;
        },

        availableOptionValues(optionIdx) {
          return this.potentialOptions[optionIdx];
        },

        getSizedImageUrl(url, size) {
          return getSizedImageUrl(url, size);
        },

        getUpsell(itemsWithUpsell) {
          console.log(itemsWithUpsell);
          return itemsWithUpsell[0];
        },

        getVariantOfType(type = '', options = []) {
          const optionOfType = [...options].find(option => option.name === type);

          return optionOfType ? optionOfType.value : '';
        },

        async handleQtyClick(line, quantity, isPlus = false) {
          const itemData = { line, quantity };
          const oldQty = isPlus ? quantity - 1 : null;

          await this.changeCartItem(itemData);

          const item = this.cartItems[line - 1];

          if (oldQty === item.quantity) alert(`You have the last of ${item.product_title} in ${item.variant_title.replaceAll(' /', ',')} in your cart.`);
        },

        setUpsellBlock(itemsWithUpsell) {
          this.hasUpsell = itemsWithUpsell.length > 0;

          if (!this.hasUpsell) return;

          const data = window.upsells[itemsWithUpsell[0].handle];

          if (itemsWithUpsell.length === 1) {
            this.upsell = JSON.parse(data.upsellJson);
            this.optionsWithValues = JSON.parse(data.optionsWithValuesJson)
          }

          /* this.upsell = itemsWithUpsell.length === 1
            ? JSON.parse(window.upsells[itemsWithUpsell[0].handle].upsellJson)
            : this.getUpsell(itemsWithUpsell); */
        },

        async submit(e) {
          const { id } = this.selectedVariant;
          const properties = {};
          const quantity = this.quantity;
          const cartData = { id, properties, quantity };

          await this.addToCart(cartData);
          await this.hydrateCartItems();
          this.toggleUpsellForm();
        },

        toggleUpsellForm() {
          this.isUpsellActive = !this.isUpsellActive;
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
