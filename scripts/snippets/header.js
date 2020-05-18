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
    toggleProducts: function() {
      this.isShowingProducts = !this.isShowingProducts;
    },
    toggleOpen: function() {
      this.isOpen = !this.isOpen;
    },
    handleScroll: function() {
      this.isScrolled = window.scrollY > 50;
    },
  },
});
