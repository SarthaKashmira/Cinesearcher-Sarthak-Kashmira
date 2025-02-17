module.exports = {
  purge: [],
  media: false, // or 'media' or 'class'
  theme: {
    backgroundColor: theme => ({
      ...theme('colors'),
      'viewHistory': '#E4E4F8',
      'selectViewHistory': '#2f62ff',
    }),
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
