import Vue from 'vue';

const productSteps = new Vue({
  delimiters: ['${', '}'],
  el: '#ProductSteps',
  data: {
    step: 1,
  },
  methods: {
    selectStep: function(step) {
      this.step = step;
    },
  },
});
