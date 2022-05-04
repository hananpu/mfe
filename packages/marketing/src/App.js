import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import {
  StylesProvider,
  createGenerateClassName,
} from "@material-ui/core/styles";

import Landing from "./components/Landing";
import Pricing from "./components/Pricing";

export default () => {
  /**
   * class name collision => Material ui productionda jss1, jss2 şeklinde classlar üretiyor. Diğer projelerde de material ui varsa onlarda da jss1, jss2
   * şeklinde className üreteceğinden createGenerateClassName methodu ile classların prefixini ayarlıyoruz.
   */
  const generateClassName = createGenerateClassName({
    productionPrefix: "ma",
  });

  return (
    <StylesProvider generateClassName={generateClassName}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/pricing" component={Pricing} />
          <Route path="/" component={Landing} />
        </Switch>
      </BrowserRouter>
    </StylesProvider>
  );
};
