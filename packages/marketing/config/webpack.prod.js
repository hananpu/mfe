const { merge } = require("webpack-merge");
const commonConfig = require("./webpack.common");
const packegeJson = require("../package.json");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

const prodConfig = {
  mode: "production",
  output: {
    filename: "[name].[contenthash].js",
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "marketing",
      filename: "remoteEntry.js",
      exposes: {
        "./MarketingApp": "./src/bootstrap",
      },
      /**
       * projeler arası ortal kullanılan bağımlılıkları tek tek ekleyerek kontrol etmek istemessek
       * package.json fileın dependency objesini direk ekleyebiliriz. shared bir array bekliyor gibi görünse de
       * object i de kabul edecektir
       */
      //shared: ["react", "react-dom"]
      shared: packegeJson.dependencies,
    }),
  ],
};

module.exports = merge(commonConfig, prodConfig);
