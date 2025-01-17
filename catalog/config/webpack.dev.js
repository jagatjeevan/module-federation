const { merge } = require('webpack-merge');
const HtmlWelpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModulefederationPlugin');

const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');

const devConfig = {
  mode: 'development',
  devServer: {
    port: 8081,
    historyApiFallback: {
      index: 'index.html'
    }
  },
  plugins: [
    new HtmlWelpackPlugin({
      template: './public/index.html'
    }),
    new ModuleFederationPlugin({
      name: 'catalog',
      filename: 'remoteEntry.js',
      exposes: {
        './CatalogApp': './src/bootstrap',
      },
      shared: packageJson.dependencies,
    })
  ]
}

module.exports = merge(commonConfig, devConfig);

