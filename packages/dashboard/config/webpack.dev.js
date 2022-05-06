const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationplugin");
const commonConfig = require("./webpack.common");
const packageJson = require("../package.json");

const devConfig = {
  mode: "development",
  output: {
    publicPath: "http://localhost:8083/"
  },
  devServer: {
    port: 8083,
    historyApiFallback: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
    }
  },
  plugins: [
    new ModuleFederationPlugin({
      /**
       * Host proje webpack.config.js remotes objesi içinde bu dosyayı işaret eden itemın valuesunun @ işareti öncesi kullanılan parçasıdır.
       */
      name: "dashboard",
      /**
       * Host proje webpack.config.js remotes objesi içinde bu dosyayı işaret eden itemın value değeri olarak porttan sonra kullanılan parçasıdır.
       * Kodların nasıl yükleneceğinin talimatlarını içeririr
       */
      filename: "remoteEntry.js",
      exposes: {
        /**
         * key: Host proje tarafından import edilirken kullanılacak dosya adında alias olarak kullanılacak değerdir.
         * value: Host proje halihazırda bir ön yükleyiciye sahip olduğundan direk index yerine bootstrap file veriyoruz.
         */
        "./DashboardApp": "./src/bootstrap",
      },
      /**
       * Projelerimizde benzer pluginler var ise shared ile host projeye ikisini de yükleme diyoruz(aşağıda).
       * Fakat bu pluginler arasında majör sürüm farkları var ise yine de host proje ikisini de yükleyecektir. (Minörde yine tek yükler. büyük olanı)
       * Eğer bu durum istenmiyorsa aşağıdaki gibi shared ı obje olarak kullnıp plugine singleton true yazıyoruz.
       * Bu durumda host projede yine majör sürüm farkı var ise bize bu konuda bir uyarı veriyor.
       * shared: {
       *  faker: {
       *   singleton: true
       * }
       * projeler arası ortak kullanılan bağımlılıkları tek tek ekleyerek kontrol etmek istemessek
       * package.json fileın dependency objesini direk ekleyebiliriz. shared bir array bekliyor gibi görünse de
       * object i de kabul edecektir
       */
      //shared: ["react", "react-dom"]
      shared: packageJson.dependencies,
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};

module.exports = merge(commonConfig, devConfig);
