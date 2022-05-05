import React from "react";
import { BrowserRouter } from "react-router-dom";
import {
  StylesProvider,
  createGenerateClassName,
} from "@material-ui/core/styles";
import Header from "./components/Header";
import MarketingApp from "./components/MarketingApp";

export default () => {
  /**
   * class name collision => Material ui productionda jss1, jss2 şeklinde classlar üretiyor. Diğer projelerde de material ui varsa onlarda da jss1, jss2
   * şeklinde className üreteceğinden createGenerateClassName methodu ile classların prefixini ayarlıyoruz.
   */
  const generateClassName = createGenerateClassName({
    productionPrefix: "ca",
  });
  return (
    <BrowserRouter>
      <StylesProvider generateClassName={generateClassName}>
        <h1>TEST1</h1>
        <Header />
        <MarketingApp />
      </StylesProvider>
    </BrowserRouter>
  );
};
