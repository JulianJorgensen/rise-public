module.exports = {
  plugins: {
    'postcss-import': {
      root: __dirname,
    },
    'postcss-mixins': {},
    'postcss-each': {},
    'postcss-remify': {},
    'postcss-cssnext': {},
    'postcss-font-magician' : {
      variants: {
        'Poppins': {
          '400': [],
          '600': []
        }
      },
      foundries: ['google']
    }
  }
};
