import * as serviceWorker from './serviceWorker';
// React imports
import React from 'react';
import ReactDOM from 'react-dom';
// Style imports
import './index.css';
import 'semantic-ui-css/semantic.min.css';
// redux imports
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
// file imports
import App from './App';
import rootReducer from "./Redux/reducers";


// check out redux devtools for more details
const composeEnhancers = compose;  // window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ||
let store = createStore(rootReducer, 
  composeEnhancers(applyMiddleware(thunk, logger))
  );

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
