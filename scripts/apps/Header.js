import Vue from 'vue';
import store from '../store';
import { mapActions, mapGetters } from 'vuex';

const selectors = {
  headerEl: '#headerComponent',
};

document.addEventListener('DOMContentLoaded', () => {
  if (selectors.headerEl) {
    new Vue({
      store,
      delimiters: ['${', '}'],
      el: '#headerComponent',
      name: "Header",
      data: {
        message: 'Hello Vue!',
        mobileMenuIsActive: false,
        isScrolled: false,
        activeChildLinksIndex: -1,
        lightContent: false,
      },
      created() {
        window.addEventListener('scroll', this.handleScroll);

        const hero = document.getElementById('hero');
        if (hero && hero.classList.contains('hero_background_dark')) {
          this.lightContent = true;
        }
      },
      destroyed() {
        window.removeEventListener('scroll', this.handleScroll);
      },
      computed: {
        ...mapGetters('cart', ['cartCount']),
      },
      methods: {
        ...mapActions('cart', ['toggleMiniCart']),
        handleScroll: function () {
          this.isScrolled = window.scrollY > 50;
          this.activeChildLinksIndex = -1;
        },
        toggleActiveChildLinks({ activeChildLinksIndex }) {
          this.activeChildLinksIndex = activeChildLinksIndex
        },
        toggleMobileMenu() {
          this.mobileMenuIsActive = !this.mobileMenuIsActive;
          document.documentElement.classList.toggle('mobile-menu--active', this.mobileMenuIsActive);
        },
      },
    });
  }
});
