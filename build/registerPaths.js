const tsconfigPaths = require("tsconfig-paths");
const tsConfig = require("../tsconfig.json");

tsconfigPaths.register({
  baseUrl: tsConfig.compilerOptions.outDir,
  paths: tsConfig.compilerOptions.paths,
});
