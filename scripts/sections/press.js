import Flickity from 'flickity';
import Vue from 'vue';

let flkty;

const press = new Vue({
  delimiters: ['${', '}'],
  el: '#press',
  data: {
    activeItem: 0,
    inactiveItem: null,
    count: 0,
  },
  mounted () {
    // Add the interval
    this.count = this.$el.getAttribute('data-count');
    this.interval = setInterval(this.nextItem, 4000);
  },
  destroyed () {
    // Remove the interval
    clearInterval(this.interval);
  },
  methods: {
    selectItem: function(index) {
      // User input, clear interval
      if (index === this.activeItem) {
        return;
      }
      clearInterval(this.interval);
      this.preventReset = false;
      this.changeItem(index);
    },
    changeItem: function(index) {
      this.inactiveItem = this.activeItem;
      setTimeout(() => {
        this.inactiveItem = null;
      }, 750);
      this.activeItem = index;

      if (flkty && index !== flkty.selectedIndex) {
        flkty && flkty.select(index);
      }
    },
    nextItem: function() {
      let activeItem = this.activeItem + 1;
      if (activeItem >= this.count) {
        activeItem = 0;
      }
      this.changeItem(activeItem);
    },
  },
});

flkty = new Flickity('#pressSlider', {
  pageDots: false,
  prevNextButtons: false,
  fade: true,
  autoPlay: 0,
  initialIndex: 0,
  pauseAutoPlayOnHover: true,
  arrowShape: {
    x0: 10,
    x1: 60, y1: 50,
    x2: 70, y2: 40,
    x3: 30
  },
  on: {
    ready: () => {

    },
    change: (index) => {
      press.selectItem(index);
    },
  }
});
