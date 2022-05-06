import React, { lazy, Suspense, useEffect, useState } from "react";
import { Router, Redirect, Route, Switch } from "react-router-dom";
import {
  StylesProvider,
  createGenerateClassName,
} from "@material-ui/core/styles";
import { createBrowserHistory } from "history";
import { CssBaseline } from '@material-ui/core';
import Progress from "./components/Progress";
import Header from "./components/Header";
const MarketingLazy = lazy(() => import("./components/MarketingApp"));
const AuthLazy = lazy(() => import("./components/AuthApp"));
const DashboardLazy = lazy(() => import("./components/DashboardApp"));

const history = createBrowserHistory();

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

  useEffect(() => {
    if(isSignedIn) {
      history.push("/dashboard");
    }
  } , [isSignedIn]);
  return (
    /**
     * BrowserRouter la history.push u nasıl yaparım bilmiyorum.
     * Bu yüzden Router kullanıp createBrowserHistory ile history oluşturdup pasladım.
     */
    <Router history={history}>
      <StylesProvider generateClassName={generateClassName}>
        <CssBaseline>
          <Header onSignOut={()=> setIsSignedIn(false)} isSignedIn={isSignedIn} />
          <Suspense fallback={<Progress />}>
            <Switch>
              <Route path="/auth">
                <AuthLazy onSignIn={()=>setIsSignedIn(true)} />
              </Route>
              <Route path="/dashboard">
                {isSignedIn ? <DashboardLazy /> : <Redirect to="/auth/signin" />}
              </Route>
              <Route path="/" component={MarketingLazy} />
            </Switch>
          </Suspense>
        </CssBaseline>
      </StylesProvider>
    </Router>
  );
};
