import querystring from 'querystring';

export default {
  methods: {
    activateOption(optionIdx) {
      this.activeOptionIdx = optionIdx;
    },

    availableOptionValues(optionIdx) {
      return this.potentialOptions[optionIdx];
    },

    getProductImage: function () {
      if (this.options[0]) {
        let variant = this.product.variants.find(({ option1 }) => option1 === this.options[0]);

        if (variant) return variant.featured_image.src;
      }

      return this.product.featured_image
    },

    handleOptionChange({ optionIdx }) {
      this.options = this.options.filter((option, idx) => {
        return idx <= optionIdx
      });
    },

    isInputOutOfStock({ option, value }) {
      const availableVariants = this.product.variants.filter(variant => variant.available);
      const { position } = option;
      switch (position) {
        case 1:
          return false;

        case 2: {
          const variants = availableVariants.filter(variant => {
            return variant.options[0] === this.options[0]
              && variant.options[1] === value;
          });

          return variants.length === 0;
        }

        case 3: {
          const variants = availableVariants.filter(variant => {
            return variant.options[0] === this.options[0]
              && variant.options[1] === this.options[1]
              && variant.options[2] === value;
          });

          return variants.length === 0;
        }
      }

      return false;
    },

    isUpsellInCart({ handle }) {
      return this.cartItems.find(item => item.handle === handle);
    },

    setUpsellBlock() {
      this.setHasUpsell(this.itemsWithUpsell.length > 0 && this.cartCount > 0);

      if (!this.hasUpsell) return;

      let data = window.upsells[this.itemsWithUpsell[0]];
      let upsell = JSON.parse(data.upsellJson);

      if (this.itemsWithUpsell.length === 1 && !this.isUpsellInCart(upsell)) {
        this.setUpsell(upsell);
        return this.optionsWithValues = JSON.parse(data.optionsWithValuesJson);
      } else {
        const upsellsNotInCart = this.itemsWithUpsell.filter(handle => !this.isUpsellInCart(JSON.parse(window.upsells[handle].upsellJson)));

        this.setHasUpsell(upsellsNotInCart.length > 0);

        if (!this.hasUpsell) return;

        data = window.upsells[upsellsNotInCart.slice(-1)];
        upsell = JSON.parse(data.upsellJson);
        this.setUpsell(upsell);
        return this.optionsWithValues = JSON.parse(data.optionsWithValuesJson);
      }
    },
  },

  computed: {
    availableVariants() {
      return this.product.variants.filter(variant => variant.available);
    },

    inputOptionAttributes() {
      const upsell = this.isUpsellActive ? '_upsell' : '';

      return (product, option, value) => ({
        class: { "out-of-stock": this.isInputOutOfStock({ option, value }) },
        name: `option${option.position}`,
        id: `product${product.id}_option${option.name}_value${value.replace(/ - /g, '-').replace(/ /g, '-').replace(/\//g, '-').toLowerCase()}${upsell}`,
        key: `"product${product.id}_option${option.name}_value${value.replace(/ - /g, '-').replace(/ /g, '-').replace(/\//g, '-').toLowerCase()}`
      })
    },

    labelOptionAttributes() {
      const upsell = this.isUpsellActive ? '_upsell' : '';

      return (product, option, value) => ({
        for: `product${product.id}_option${option.name}_value${value.replace(/ - /g, '-').replace(/ /g, '-').replace(/\//g, '-').toLowerCase()}${upsell}`,
        class: `option-value  option--${value.replace(/ - /g, '-').replace(/ /g, '-').replace(/\//g, '-').toLowerCase()}`
      })
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

    potentialVariants() {
      if (this.product.variants) {
        let result = this.product.variants.filter(variant => {
          return this.options.every((option, index) => {
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
      console.log('potential');

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
    },

    selectedVariant: {
      get() {
        if (this.product.variants) {
          let result = this.product.variants.filter(variant => {

            const matchesEverySelectedOption = this.options.every((option, index) => {
              return variant.options[index] === option;
            });

            return matchesEverySelectedOption;
          });


          // if a result is found and we are on the Product page
          if (result.length > 0 && this.$el.closest('[data-template-name="product"]')) {
            let getVars = querystring.parse(location.search.substr(1));
            getVars['variant'] = result[0].id;

            const url = `${window.location.pathname}?${querystring.stringify(getVars)}`;
            history.replaceState({}, '', url);
          }

          if (result.length > 1) {
            const availableVariants = result.filter(variant => variant.available);

            return availableVariants[0];
          } else {
            return result[0] || null;
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
  },
};
