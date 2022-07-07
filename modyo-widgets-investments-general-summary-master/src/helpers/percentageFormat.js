export default function percentageFormat(value, precision = 2) {
  return `${Number(value).toFixed(precision)}%`;
}
