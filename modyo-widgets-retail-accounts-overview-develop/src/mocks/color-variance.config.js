const configColors = {
  down: {
    background: '#B24D6B19',
    color: '#B24D6B',
  },
  up: {
    background: '#5CB24F19',
    color: '#5CB24F',
  },
  equal: {
    background: '#9FA4A619',
    color: '#9FA4A6',
  },
};

const configVariance = [
  {
    id: 1,
    style: {
      background: configColors.down.background,
      color: configColors.down.color,
    },
    icon: 'angle-double-down',
  },
  {
    id: 2,
    style: {
      background: configColors.down.background,
      color: configColors.down.color,
    },
    icon: 'arrow-down',
  },
  {
    id: 3,
    style: {
      background: configColors.equal.background,
      color: configColors.equal.color,
    },
    icon: 'equals',
  },
  {
    id: 4,
    style: {
      background: configColors.up.background,
      color: configColors.up.color,
    },
    icon: 'arrow-up',
  },
  {
    id: 5,
    style: {
      background: configColors.up.background,
      color: configColors.up.color,
    },
    icon: 'angle-double-up',
  },
];

module.exports = {
  configVariance,
};
