import { Provider } from "react-redux";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware, compose } from "redux";
import { StyleRoot } from "@instacart/radium";

import App from "./App";
import reducers from "./reducers";
import Frontpage from "./Frontpage";
import thunk from "redux-thunk";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StyleRoot>
    <Provider store={store}>
      <App />
    </Provider>
  </StyleRoot>,
  rootElement
);
