const path = require('path');
const webpack = require('webpack');
const ts = require('typescript');

const LOG_DETAILS = true;

module.exports = (config, context) => {
  const resultConfig = {
    ...config,
  };

  const rules = resultConfig.module.rules;
  /**
   * loader: 'D:\\dev_no_backup\\nx-swagger\\node_modules\\ts-loader\\index.js',
   */
  const tsLoaderRule = rules.find((item) => item.loader.includes('ts-loader'));
  LOG_DETAILS && console.warn('resultConfig', resultConfig.module.rules[0]);
  if (!tsLoaderRule) {
    throw new Error(__filename + ': tsLoaderRule not found!');
  }
  if (tsLoaderRule.options.getCustomTransformers) {
    throw new Error(__filename + ': getCustomTransformers already set!');
  }
  /**
   * add the custom transformer
   * see: https://docs.nestjs.com/openapi/cli-plugin#using-the-cli-plugin
   */
  tsLoaderRule.options = {
    ...tsLoaderRule.options,
    /**
     * note: currently we MUST create the program!
     * https://github.com/nrwl/nx/issues/2147#issuecomment-587168523
     *
     * in the developer console:
     *   program.getRootFileNames()
     *   Array(1) ["D:\dev_no_backup\nx-swagger\apps\api\main.ts"]
     *   programArg.getRootFileNames()
     *   Array(0) []
     */
    getCustomTransformers: (programArg) => {
      const program = ts.createProgram([path.join(__dirname, 'main.ts')], {});
      return {
        before: [
          require('@nestjs/swagger/plugin').before(
            {
              classValidatorShim: true,
            },
            program
          ),
        ],
      };
    },
    // transpileOnly: false,
    // experimentalWatchApi: false
  };

  /**
   * we must also  add a provider plugin
   * see: https://github.com/nrwl/nx/issues/2147#issuecomment-587165933
   */
  resultConfig.plugins = [
    ...(resultConfig.plugins || []),
    new webpack.ProvidePlugin({
      openapi: '@nestjs/swagger',
    }),
  ];
  LOG_DETAILS && console.warn('resultConfig', resultConfig.module.rules[0]);
  return resultConfig;
};
