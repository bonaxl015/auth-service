const path = require('path');

const getPathMapper = (folderName) =>
  path.resolve(__dirname, 'src', folderName);

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['./jest.setup.ts'],
  testMatch: ['**/*.test.ts'],
  watchman: false,
  moduleNameMapper: {
    '^@api/(.*)$': getPathMapper('api'),
    '^@db/(.*)$': getPathMapper('db'),
    '^@enums/(.*)$': getPathMapper('enums'),
    '^@middlewares/(.*)$': getPathMapper('middlewares'),
    '^@utils/(.*)$': getPathMapper('utils'),
  }
};
