import Vue from 'vue';

const productSteps = new Vue({
  delimiters: ['${', '}'],
  el: '#ProductSteps',
  data: {
    step: 1,
    imageCount: 0,
    activeImage: 1,
  },
  created() {
    this.imageCount = document.querySelectorAll('.product-steps__image img').length;
  },
  methods: {
    selectStep: function(step) {
      this.step = step;
      this.activeImage = step <= this.imageCount ? step : this.imageCount;
    },
  },
});
