import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

import {Router, browserHistory} from 'react-router';
import Routes from './routes';

const rootEl = document.getElementById('root')

const App = () => (
  <Router
    history={browserHistory}
    routes={Routes}
  />
)

ReactDOM.render(
  <App />,
	rootEl
);
// registerServiceWorker();


if (module.hot) {
  module.hot.accept();
}