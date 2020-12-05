import Vue from 'vue';
import { mapActions, mapGetters } from 'vuex';
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
        stickyAddToCartIsActive: false,
        tab: 'benefits',
        weights: [],
      },
      mounted() {
        this.product = JSON.parse(this.$el.dataset.product);
        this.currentVariant = JSON.parse(this.$el.dataset.currentVariant);
        this.optionsWithValues = JSON.parse(this.$el.dataset.optionsWithValues);

        if (this.currentVariant && this.currentVariant.options) {
          this.options = this.currentVariant.options;
        }

        if (document.querySelector('#shopify-section-size-popup')) {
          document.querySelector('#shopify-section-size-popup .size-popup__background').addEventListener('click', event => {
            this.toggleActiveSizePopup();
          });

          document.querySelector('#shopify-section-size-popup #size-popup__close-button').addEventListener('click', event => {
            this.toggleActiveSizePopup();
          });
        }
        
        const stickyAddToCart = document.querySelector('#stickyAddToCart');
        const stickyAddToCartOffsetTop = stickyAddToCart.offsetTop;

        const checkScrollPosition = () => {
          
          if ( !this.stickyAddToCartIsActive && scrollY >= stickyAddToCartOffsetTop ) {
            requestAnimationFrame(() => {
              this.stickyAddToCartIsActive = true
              stickyAddToCart.classList.add('active');
            });
          }
          if ( this.stickyAddToCartIsActive && scrollY < stickyAddToCartOffsetTop ) {
            requestAnimationFrame(() => {
              this.stickyAddToCartIsActive = false
              stickyAddToCart.classList.remove('active');
            });
          }
        } 

        window.addEventListener('scroll', () => {
          checkScrollPosition();
        });

      },
      mixins: [productOptions],
      methods: {
        ...mapActions('cart', [
          'addToCart',
          'hydrateCartItems',
          'setHasUpsell',
          'setUpsell',
          'toggleMiniCart',
          'toggleStickyAddToCart',
        ]),
        ...mapActions('popups', ['openSizePopup', 'openWeightPopup']),

        async submit(e) {
          e.preventDefault();
          const { id } = this.selectedVariant;
          const properties = {};
          const quantity = this.quantity;
          const cartData = { id, properties, quantity };

          await this.addToCart(cartData);
          await this.hydrateCartItems();
          this.setUpsellBlock();
          this.toggleMiniCart();
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
        ...mapGetters('cart', ['cartItems', 'hasUpsell', 'itemsWithUpsell', 'upsell']),
        crop() {
          if (window.matchMedia('(max-width: 767px)').matches) {
            return '420x252';
          } else {
            return '840x840'
          }
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

  if (document.querySelector('#size-popup')) {
    new Vue({
      name: 'SizePopup',
      store,
      el: '#size-popup',
      methods: {
        ...mapActions('popups', ['openSizePopup', 'closeSizePopup']),
      },
      computed: {
        ...mapGetters('popups', ['sizePopupIsOpen'])
      }
    });
  }

  if (document.querySelector('#weight-popup')) {
    new Vue({
      name: 'WeightPopup',
      store,
      el: '#weight-popup',
      methods: {
        ...mapActions('popups', ['openWeightPopup', 'closeWeightPopup']),
      },
      computed: {
        ...mapGetters('popups', ['weightPopupIsOpen'])
      }
    });
  }

});
