module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts?$': [
      'ts-jest', {
        isolatedModules: true,
      },
    ],
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
};