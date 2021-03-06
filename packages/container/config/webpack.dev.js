const { merge } = require("webpack-merge");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const commonConfig = require("./webpack.common");
const packageJson = require("../package.json");

const devConfig = {
  mode: "development",
  output: {
    publicPath: "http://localhost:8080/"
  },
  devServer: {
    port: 8080,
    historyApiFallback: true,
  },
  plugins: [
    new ModuleFederationPlugin({
      /**
       * genel kullanım. şuan kullanılmıyor.
       */
      name: "container",
      /**
       * bağlı projelerin bulunduğu dizin.
       */
      remotes: {
        /**
         * key      => Host proje tarafından import edilirken kullanılacak dosya adından önce alias olarak kullanılacak değerdir.
         * yani import "marketing/MarketingApp" pathindeki slash işareti öncesindeki değer.
         * value    => marketing: remote proje webpack.config.js teki name değerine eşit olacaktır. RemoteEntry.js e networkten
         *             bakacak olursak tüm dosyayı bu adla global bir değişkene atadığını görürüz. Biz bu adı arıyoruz.
         *          => http://localhost:8081/: marketing projesinin çalıştığı port değeri.
         *          => remoteEntry.js : Remote proje webpack.config.js deki filename değeri.
         */
        marketing: "marketing@http://localhost:8081/remoteEntry.js",
        auth: "auth@http://localhost:8082/remoteEntry.js",
        dashboard: "dashboard@http://localhost:8083/remoteEntry.js"
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
  ],
};

module.exports = merge(commonConfig, devConfig);
