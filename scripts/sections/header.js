import Vue from 'vue';

const header = new Vue({
  delimiters: ['${', '}'],
  el: '#headerComponent',
  data: {
    message: 'Hello Vue!',
    isShowingProducts: false,
    isOpen: false,
    isScrolled: false,
    cartCount: 0,
  },
  created () {
    window.addEventListener('scroll', this.handleScroll);
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    toggleProducts: function(event) {
      this.isShowingProducts = !this.isShowingProducts;
      event.stopPropagation();
      if (this.isShowingProducts) {
        window.addEventListener('click', this.closeProducts);
      }
    },
    closeProducts: function(event) {
      const dropdown = document.getElementById('headerDropdown');
      if (!dropdown.contains(event.target)) {
        this.isShowingProducts = false;
        window.removeEventListener('click', this.closeProducts);
      }
    },
    toggleOpen: function() {
      this.isOpen = !this.isOpen;
    },
    handleScroll: function() {
      this.isScrolled = window.scrollY > 50;
    },
  },
});
