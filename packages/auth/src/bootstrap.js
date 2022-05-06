console.log("AUTH REMOTE PROJECT");
import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory, createMemoryHistory } from "history";

import App from "./App";

/**
 * Sunduğumuz içeriği remote projelerimizde kullanmak için bu dosyaların içinde bulunan index.html dosyasına ekleyeceğiz.
 * Remote projelerimizde kullandığımız html dosyası yanlızca Isolation ortamda geçerlidir.
 * Dolayısı ile Host projemizi geliştiren ekip Remote projedeki htmli id veya classı bilemeyebilir veya kullanmayı tercih etmek istemeyebilirir.
 * Bu sebeple js kaynağımızı html elementi dinamik olarak seçilebilcek şekilde sunmalıyız.
 */
const mount = (el, { onSignIn, onNavigate, defaultHistory, initialPath }) => {
  /**
   * App.js e Isolation için BrowserHistory Host ortam için MemoryHistory gönderiyoruz.
   */
  const history = defaultHistory || createMemoryHistory({
    initialEntries: [initialPath]
  });

  /**
   * Isolation'da OnNavigate kullanılmadığı için kontrol ediyoruz.
   * listen methodu onNavigate callback fonksiyonuna location parametresi paslıyor.
   */
  if (onNavigate) {
    history.listen(onNavigate);
  }

  ReactDOM.render(<App onSignIn={onSignIn} history={history} />, el);

  return {
    /**
     * HOST'TAN REMOTE'A ROUTING PASLAMA
     * Host proje routing'inde bir değişiklik olduğunda bu değişikliği Remote projeye bildirmemiz gerekiyor.
     * onParentNavigate callback fonksiyonu ile Host proje location.pathname bilgisini alıp Remote projeye createMemoryHistory den pushluyoruz.
     */
    onParentNavigate({ pathname: nextPathname }) {
      const { pathname } = history.location;
      if (pathname !== nextPathname) {
        history.push(nextPathname);
      }
    },
  };
};

/**
 * Isolation ortam için
 * Dosyayı isolation ortamda ve development modunda kullanıyoruz.
 * Html dosyamızda kesinlikle bildiğimiz ve host ortamında bulunmayan bir wrapper mevcut.
 */
if (process.env.NODE_ENV === "development") {
  const devRoot = document.querySelector("#_auth-dev-root");

  if (devRoot) {
    mount(devRoot, { defaultHistory: createBrowserHistory() });
  }
}

/**
 * Host ortam için
 * Dosyayı host ortamda kullanıyoruz.
 * Html dosyamızda kesinlikle bildiğimiz bir wrapper mevcut değil.
 * Ayrıca host proje geliştiricileri kodu hemen çalıştırmak istemeyebilir.
 */
export { mount };
