import Vue from 'vue';

const header = new Vue({
  name: "Header",
  delimiters: ['${', '}'],
  el: '#headerComponent',
  data: {
    message: 'Hello Vue!',
    mobileMenuIsOpen: false,
    isScrolled: false,
    cartCount: 0,
    activeChildLinksIndex: -1
  },
  created () {
    window.addEventListener('scroll', this.handleScroll);
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll: function() {
      this.isScrolled = window.scrollY > 50;
      this.activeChildLinksIndex = -1;
    },
    toggleActiveChildLinks({ activeChildLinksIndex }) {
      if(this.activeChildLinksIndex == activeChildLinksIndex) {
        this.activeChildLinksIndex = -1
      } else {
        this.activeChildLinksIndex = activeChildLinksIndex
      }
    },
    toggleMobileMenu: function() {
      this.mobileMenuIsOpen = !this.mobileMenuIsOpen;
    },
  },
});
