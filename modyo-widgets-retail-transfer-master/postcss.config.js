const PURGE_CSS = require('@fullhuman/postcss-purgecss');

const AUTOPREFIXER = require('autoprefixer');

module.exports = {
  plugins:
  process.env.NODE_ENV === 'production'
    ? [AUTOPREFIXER, PURGE_CSS({
      content: ['./public/**/*.html', './src/**/*.vue'],
      defaultExtractor(content) {
        const contentWithoutStyleBlocks = content.replace(/<style[^]+?<\/style>/gi, '');
        return contentWithoutStyleBlocks.match(/[A-Za-z0-9-_/:]*[A-Za-z0-9-_/]+/g) || [];
      },
      safelist: {
        standard: [
          /-(leave|enter|appear)(|-(to|from|active))$/,
          /^(?!(|.*?:)cursor-move).+-move$/,
          /^router-link(|-exact)-active$/,
          /fa.*/,
        ],
        deep: [
          /data-v-.*/,
          /svg.*/,
          /^d-*/,
          /^modal*/,
          /^progress*/,
          /^multiselect*/,
          /^vd*/,
        ],
      },
    })]
    : [AUTOPREFIXER],
};
