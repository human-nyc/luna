import querystring from 'querystring';

export default {
  methods: {
    handleOptionChange({ optionIdx }) {
      this.options = this.options.filter((option, idx) => {
        return idx <= optionIdx
      });
    },
  },

  computed: {
    inputOptionAttributes() {
      return (product, option, value) => ({
        name: `option${option.position}`,
        id: `product${product.id}_option${option.name}_value${value.replace(/ /g, '-')}`,
        key: `"product${product.id}_option${option.name}_value${value.replace(/ /g, '-')}`
      })
    },

    labelOptionAttributes() {
      return (product, option, value) => ({
        for: `product${product.id}_option${option.name}_value${value.replace(/ /g, '-')}`,
        class: `option-value  option--${value.replace(/ - /g, '-').replace(/ /g, '-').toLowerCase()}`
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
          return this.opttions.every((option, index) => {
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
    },

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
  },
};
