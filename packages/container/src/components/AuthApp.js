/**
 * auth => Host proje webpack.config.js remotes objesinde (auth için) key değeri.
 * AuthApp => Remote proje (auth) webpack.config.js exposes objesinde "./src/bootstrap" için alias olarak kullanılan key değeri.
 */
import React, { useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import { mount } from "auth/AuthApp";

const AuthApp = ({onSignIn}) => {
  const ref = useRef();
  const history = useHistory();

  useEffect(() => {
    /**
     * REMOTE'TAN HOST'A ROUTING PASLAMA
     * Remote proje routing'inde bir değişiklik olduğunda bu değişikliği host projeye bildirmemiz gerekiyor.
     * onNavigate callback fonksiyonu ile Remote proje location.pathname bilgisini alıp Host projeye useHistory den pushluyoruz.
     */
    const { onParentNavigate } = mount(ref.current, {
      /**
       * Host tarafından Remote'a ait ilk yönlendirme yapıldığında (tıklanan link host componentinde mesela navigasyon)
       * veya urle direk remote la ilgili bir path ile geldiğimizde, BrowserHistory ilk anda urlde gördüğü routingi kaydederken
       * Remote Proje MemoryHistory o anda boş duruyor. Tıklama sonrası doluyor fakat o arada sayfa boş görünecek. 
       * İkinci tıklamada dolu görünür. Bunu önlemek için initialPath parametresi kullanılır.
       * Bu yolla Remote proje MemoryHistory'e ilk anda urlde gördüğü veya Host tarafından navigate edilen path paslanıyor.
       */
      initialPath: history.location.pathname,
      onNavigate: ({ pathname: nextPathname }) => {
        const { pathname } = history.location;
        /**
         * Infinite loop olmaması için current pathname ile next pathname karşılaştırıyoruz.
         */
        if (pathname !== nextPathname) {
          console.log(
            "Log from Container Project(AuthApp), navigated from Auth Project"
          );
          history.push(nextPathname);
        }
      },
      onSignIn: () => {
        onSignIn();
      }
    });
    /**
     * listen methodu onParentNavigate callback fonksiyonuna location parametresi paslıyor.
     */
    history.listen(onParentNavigate);
  }, []);
  
  /**
   * Spesifik bir divimiz olmadığından, yarattığımız dive useRef ile referans alıp mount fonksiyonuna gönderiyoruz.
   */
  return <div data-project="auth" data-framework="react" ref={ref}></div>;
};

export default AuthApp;
