const { resolve } = require('path');

module.exports = {
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@fc-components', resolve('node_modules/@modyo/financial-commons/src/components'));
    config.resolve.alias
      .set('@fc-filters', resolve('node_modules/@modyo/financial-commons/src/filters'));

    const svgRule = config.module.rule('svg');

    svgRule.uses.clear();

    svgRule
      .use('babel-loader')
      .loader('babel-loader')
      .end()
      .use('vue-svg-loader')
      .loader('vue-svg-loader');
  },
  pluginOptions: {
    i18n: {
      locale: 'es',
      fallbackLocale: 'es',
      localeDir: 'locales',
      enableInSFC: false,
    },
  },
};
