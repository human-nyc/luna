import Vue from 'vue';

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
      this.inactiveItem = this.activeItem;
      setTimeout(() => {
        this.inactiveItem = null;
      }, 750);
      this.activeItem = index;
    },
    nextItem: function() {
      let activeItem = this.activeItem + 1;
      if (activeItem >= this.count) {
        activeItem = 0;
      }
      this.selectItem(activeItem);
    },
  },
});
