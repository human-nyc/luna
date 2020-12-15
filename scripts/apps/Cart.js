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
        isUpsellActive: false,
        options: [],
        optionsWithValues: [],
        quantity: 1,
        tab: 1,
      },
      mounted: async function () {
        await this.hydrateCartItems();

        if (this.cartCount == 0) return;

        this.setUpsellBlock();
      },
      mixins: [productOptions],
      computed: {
        ...mapGetters('cart', [
          'cartCount',
          'cartItems',
          'cartSubtotal',
          'hasUpsell',
          'itemsWithUpsell',
          'miniCartIsOpen',
          'upsell',
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
          'setHasUpsell',
          'setUpsell',
        ]),

        getUpsellImage: function () {
          console.log('getUpsellImage');
          if (this.options[0]) {
            let variant = this.upsell.variants.find(({ option1 }) => option1 === this.options[0]);

            if (variant) return variant.featured_image.src;
          }

          return this.upsell.featured_image
        },

        getSizedImageUrl(url, size) {
          console.log('getSizedImageUrl', url, size);
          return getSizedImageUrl(url, size);
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

        async removeItem(line) {
          await this.removeCartItem(line);
          this.setUpsellBlock();
        },

        async submit(e) {
          const { id } = this.selectedVariant;
          const properties = {};
          const quantity = this.quantity;
          const cartData = { id, properties, quantity };

          await this.addToCart(cartData);
          await this.hydrateCartItems();
          this.setUpsellBlock();
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
