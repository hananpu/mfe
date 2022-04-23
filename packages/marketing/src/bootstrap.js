console.log("MARKETING REMOTE PROJECT");
import React from "react";
import ReactDOM from "react-dom";

import App from "./App";

/**
 * Mount function for the marketing package.
 */
const mount = (el) => {
  ReactDOM.render(<App/>, el);
};
/**
 * If we are in development and in isolation mode, call mount.
 */

if (process.env.NODE_ENV === "development") {
  const devRoot = document.querySelector('#_marketing-dev-root');

  if (devRoot) {
    mount(devRoot);
  }
}

/**
 * We are running through containerization, so we need to export the mount function.
 */

export { mount };
