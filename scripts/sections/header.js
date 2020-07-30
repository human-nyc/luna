import Vue from 'vue';

const header = new Vue({
  delimiters: ['${', '}'],
  el: '#headerComponent',
  data: {
    message: 'Hello Vue!',
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
    toggleActiveChildLinks({ activeChildLinksIndex }) {
      if(activeChildLinksIndex === this.activeChildLinksIndex) {
        this.activeChildLinksIndex = -1;
        this.$el.querySelector('.header__dropdown.active').classList.remove('active');
      } else {
        this.$el.querySelectorAll('.header__dropdown').forEach((el, idx) => {
          el.classList.toggle('active', idx == activeChildLinksIndex);
        });
        this.activeChildLinksIndex = activeChildLinksIndex;
      }
    },
    handleScroll: function() {
      this.isScrolled = window.scrollY > 50;

      this.$el.querySelectorAll('.header__dropdown').forEach((el, idx) => {
        el.classList.toggle('active', false);
      });
    },
  },
});
