module.exports = {
  plugins: [
    require('postcss-custom-media'),
    // require('postcss-nested'),
    require('autoprefixer'),
    require('cssnano')({
      preset: 'default',
    }),
  ],
};
