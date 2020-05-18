import Vue from 'vue';

const comparisonChart = new Vue({
  delimiters: ['${', '}'],
  el: '#comparisonChart',
  data: {
    isOpen: false,
  },
  methods: {
    toggleOpen: function() {
      this.isOpen = !this.isOpen;
    },
  },
});
