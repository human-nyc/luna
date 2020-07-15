// Control the accordions and such.
import Vue from 'vue';

const faq = new Vue({
  delimiters: ['${', '}'],
  el: '#faq',
  data: {
    activeCategory: null,
  },
  mounted() {
    // Get first id...
    const firstElement = document.querySelector('li[data-id]');
    const id = firstElement.getAttribute('data-id');
    this.activeCategory = id;
  },
  methods: {
    selectCategory: function(id) {
      this.activeCategory = id;
    }
  },
});
