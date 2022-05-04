import React from "react";
/**
 * History işlerinde Host ortam için ve Isolation modu için iki farklı yaklaşımımız olacak.
 * Birden çok projemiz olduğundan host ortamda sadece Host proje BrowserHistory'yi kullanabilir.
 * Bunun nedeni BrowserHistory (react için BrowserRouter) bir BrowserHistory objesi yaratır.
 * BrowserHistory yi Host proje de kullandığı için birden fazla obje yaratılmış olacak.
 * Duruma göre başvuracağı obje değişeceğinden kesin hatalar oluşur.
 * Bu yüzden Remote projelerde Host ortam için MemoryHistory kullanmalıyız.
 * Fakat Isolation modunda ise yine BrowserHistory kullanmalıyız.
 * Bu durumu sağlayabilmek için App.js dosyasında BrowserRouter yerine Router kullanmalı ve 
 * history durumunu bootstrap.js dosyasından (createBrowserHistory/createMemoryHistory) koşula göre paslamalıyız.
 */
import { Switch, Route, Router } from "react-router-dom";
import {
  StylesProvider,
  createGenerateClassName,
} from "@material-ui/core/styles";

import Landing from "./components/Landing";
import Pricing from "./components/Pricing";

export default ({ history }) => {
  /**
   * class name collision => Material ui productionda jss1, jss2 şeklinde classlar üretiyor. Diğer projelerde de material ui varsa onlarda da jss1, jss2
   * şeklinde className üreteceğinden createGenerateClassName methodu ile classların prefixini ayarlıyoruz.
   */
  const generateClassName = createGenerateClassName({
    productionPrefix: "ma",
  });

  return (
    <StylesProvider generateClassName={generateClassName}>
      <Router history={history}>
        <Switch>
          <Route exact path="/pricing" component={Pricing} />
          <Route path="/" component={Landing} />
        </Switch>
      </Router >
    </StylesProvider>
  );
};
