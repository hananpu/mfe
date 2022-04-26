const { merge } = require("webpack-merge");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const commonConfig = require("./webpack.common");
const packageJson = require("../package.json");

const devConfig = {
  mode: "development",
  devServer: {
    port: 8080,
    historyApiFallback: true,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "container",
      remotes: {
        marketing: "marketing@http://localhost:8081/remoteEntry.js",
      },
      /**
       * projeler arası ortal kullanılan bağımlılıkları tek tek ekleyerek kontrol etmek istemessek
       * package.json fileın dependency objesini direk ekleyebiliriz. shared bir array bekliyor gibi görünse de
       * object i de kabul edecektir
       */
      //shared: ["react", "react-dom"]
      shared: packageJson.dependencies,
    }),
  ],
};

module.exports = merge(commonConfig, devConfig);
