module.exports = {
  name: 'mrz',
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  testRegex: '/src/.+?\\.test\\.ts$',
  moduleFileExtensions: [
    'ts',
    'js',
    'json',
    'node',
  ]
};

