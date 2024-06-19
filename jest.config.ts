import { JestConfigWithTsJest, pathsToModuleNameMapper } from 'ts-jest';
import { compilerOptions } from './tsconfig.json';

const moduleNameMapper = pathsToModuleNameMapper(compilerOptions.paths, {
  prefix: '<rootDir>/src',
});

const jestConfig: JestConfigWithTsJest = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['./jest.setup.ts'],
  testMatch: ['**/*.test.ts'],
  watchman: false,
  moduleNameMapper,
};

export default jestConfig;
