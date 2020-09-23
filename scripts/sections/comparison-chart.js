import Vue from 'vue';

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.shopify-section.comparison-chart').forEach(el => {

    new Vue({
      delimiters: ['${', '}'],
      el,
      data: {
        isOpen: false,
      },
      methods: {
        toggleOpen: function() {
          this.isOpen = !this.isOpen;
        },
      },
    });

  });
});
