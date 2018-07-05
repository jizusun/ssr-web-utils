import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

import {Router, browserHistory} from 'react-router';
import Routes from './routes';

const rootEl = document.getElementById('root')

ReactDOM.render(
	<Router
		history={browserHistory}
		routes={Routes}
	/>,
	rootEl
);
registerServiceWorker();


if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default
    ReactDOM.render(
      <NextApp />,
      rootEl
    )
  })
}
