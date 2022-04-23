const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

const commonConfig = require("./webpack.common.js");

const prodConfig = {
  mode: "production",
  devServer: {
    port: 8081,
    historyApiFallback: true,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "marketing",
      filename: "remoteEntry.js",
      exposes: {
        "./MarketingIndex": "./src/bootstrap.js",
      },
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    })
  ],
};

module.exports = merge(commonConfig, prodConfig);
