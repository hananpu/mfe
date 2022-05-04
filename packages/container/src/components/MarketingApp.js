/**
 * marketing => Host proje webpack.config.js remotes objesinde (marketing için) key değeri.
 * MarketingApp => Remote proje (marketing) webpack.config.js exposes objesinde "./src/bootstrap" için alias olarak kullanılan key değeri.
 */
import { mount } from "marketing/MarketingApp";
import React, { useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";

const MarketingApp = () => {
  const ref = useRef(null);
  const history = useHistory();

  useEffect(() => {
    /**
     * REMOTE'TAN HOST'A ROUTING PASLAMA
     * Remote proje routing'inde bir değişiklik olduğunda bu değişikliği host projeye bildirmemiz gerekiyor.
     * onNavigate callback fonksiyonu ile Remote proje location.pathname bilgisini alıp Host projeye useHistory den pushluyoruz.
     */
    const { onParentNavigate } = mount(ref.current, {
      onNavigate: ({ pathname: nextPathname }) => {
        const { pathname } = history.location;
        /**
         * Infinite loop olmaması için current pathname ile next pathname karşılaştırıyoruz.
         */
        if (pathname !== nextPathname) {
          console.log(
            "Log from Container/MarketingApp, navigated from marketing"
          );
          history.push(nextPathname);
        }
      },
    });
    /**
     * listen methodu onParentNavigate callback fonksiyonuna location parametresi paslıyor.
     */
    history.listen(onParentNavigate);
  }, []);

  return <div ref={ref}></div>;
};

export default MarketingApp;
