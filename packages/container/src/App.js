import React, { lazy, Suspense, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import {
  StylesProvider,
  createGenerateClassName,
} from "@material-ui/core/styles";
import { CssBaseline } from '@material-ui/core';
import Progress from "./components/Progress";
import Header from "./components/Header";
const MarketingLazy = lazy(() => import("./components/MarketingApp"));
const AuthLazy = lazy(() => import("./components/AuthApp"));

export default () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  /**
   * class name collision => Material ui productionda jss1, jss2 şeklinde classlar üretiyor. Diğer projelerde de material ui varsa onlarda da jss1, jss2
   * şeklinde className üreteceğinden createGenerateClassName methodu ile classların prefixini ayarlıyoruz.
   */
  const generateClassName = createGenerateClassName({
    disableGlobal: true,
    productionPrefix: "co"
  });
  return (
    <BrowserRouter>
      <StylesProvider generateClassName={generateClassName}>
        <CssBaseline>
          <Header onSignOut={()=> setIsSignedIn(false)} isSignedIn={isSignedIn} />
          <Suspense fallback={<Progress />}>
            <Switch>
              <Route path="/auth">
                <AuthLazy onSignIn={()=>setIsSignedIn(true)} />
              </Route>
              <Route path="/" component={MarketingLazy} />
            </Switch>
          </Suspense>
        </CssBaseline>
      </StylesProvider>
    </BrowserRouter>
  );
};
