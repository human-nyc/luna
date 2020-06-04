import Vue from 'vue';

const COLOR_OPTION = 'Color';

const ColorOptions = Vue.component('color-options', {
  props: ['colors'],
  template: `<div class="color-options">
    <button
      class="color-option"
      type="button"
      v-for="color in colors"
      @click="selectColor(color)"
      :class="{'active': selectedColor === color}"
      data-color="{{color}}"
    ></button>
  </div>
  `,
  methods: {
    selectColor: function(color) {
      this.selectedColor = color;
      this.$emit('changed', color);
    }
  },
  data: function() {
    return {
      selectedColor: '',
    };
  },
  mounted: function() {
  },
});

export const formatColors = (productData) => {
  return productData.options.find(option => option.name === COLOR_OPTION).values;
};

export default ColorOptions;
