/**
 * marketing => Host proje webpack.config.js remotes objesinde (marketing için) key değeri.
 * MarketingApp => Remote proje (marketing) webpack.config.js exposes objesinde "./src/bootstrap" için alias olarak kullanılan key değeri.
 */
import { mount } from "marketing/MarketingApp";
import React, { useRef, useEffect } from "react";

const MarketingApp = () => {
  const ref = useRef(null);

  useEffect(() => {
    /**
     * Host projede Remote projelerinin wrapperlarının id sini remote projedeki module federation name ile aynı yapmamalıyız.
     * Burada ilginç bir bug mevcut.
     * Host proje windowa bu adla bir obje oluşturur. Örneğin consola marketing yazarak bunu görebiliriz.
     * Veya network ten RemoteEntry.js dosyasını aldığımızda bu adın bir var ile değişkene atandığını görebiliriz.
     * Bunu yaparsak wrapper id elementimiz bu objenin yerini alır.
     */
    mount(ref.current);
  });

  return <div ref={ref}></div>;
};

export default MarketingApp;
