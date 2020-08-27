// Control the accordions and such.
import Vue from 'vue';

const faq = new Vue({
  delimiters: ['${', '}'],
  el: '#faq',
  data: {
    activeCategory: null,
    activeCategoryName: '',
    navOpen: false,
  },
  mounted() {
    // Get first id...
    const firstElement = document.querySelector('li[data-id]');
    const id = firstElement.getAttribute('data-id');
    this.activeCategory = id;
    this.activeCategoryName = firstElement.innerHTML;
  },
  methods: {
    selectCategory: function(id, name) {
      this.activeCategory = id;
      this.activeCategoryName = name;
      this.navOpen = false;
    },
    toggleNavigation: function() {
      this.navOpen = !this.navOpen;
    }
  },
});
