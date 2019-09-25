module.exports = {
  name: 'mrz',
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  testRegex: '/src/.+?\\.(test|spec)\\.ts$',
  moduleFileExtensions: [
    'ts',
    'js',
    'json',
    'node',
  ]
};

