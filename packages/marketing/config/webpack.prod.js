const { merge } = require("webpack-merge");
const commonConfig = require("./webpack.common");
const packegeJson = require("../package.json");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

const prodConfig = {
  mode: "production",
  output: {
    filename: "[name].[contenthash].js",
    publicPath: "/marketing/latest/"
  },
  plugins: [
    new ModuleFederationPlugin({
      /**
       * Host proje webpack.config.js remotes objesi içinde bu dosyayı işaret eden itemın valuesunun @ işareti öncesi kullanılan parçasıdır.
       */
      name: "marketing",
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
        "./MarketingApp": "./src/bootstrap",
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
      shared: packegeJson.dependencies,
    }),
  ],
};

module.exports = merge(commonConfig, prodConfig);
