export default function getCurrency(amount) {
  let format;
  switch (amount.currency) {
    case 'usd':
      format = {
        decimal: '.',
        formatWithSymbol: true,
        precision: 2,
        separator: ',',
        symbol: this.$i18n.locale === 'en-US' ? '$ ' : 'USD$ ',
      };
      break;
    case 'eur':
      format = {
        decimal: ',',
        formatWithSymbol: true,
        precision: 2,
        separator: '.',
        symbol: '€ ',
      };
      break;
    case 'clp':
      format = {
        decimal: ',',
        formatWithSymbol: true,
        precision: 0,
        separator: '.',
        symbol: this.$i18n.locale === 'es-CL' ? '$ ' : 'CLP ',
      };
      break;
    default: break;
  }
  return format;
}
