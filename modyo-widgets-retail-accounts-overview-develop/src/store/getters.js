import { configVariance } from '../mocks/color-variance.config';

const getVarianceConfig = (sentId) => configVariance.find(({ id }) => id === sentId);

export default {
  getStyles: () => (sentId) => getVarianceConfig(sentId)?.style,
  getIcon: () => (sentId) => getVarianceConfig(sentId)?.icon,
};
