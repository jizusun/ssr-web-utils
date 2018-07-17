import React from 'react'
import ReactDOM from 'react-dom'
// import registerServiceWorker from './registerServiceWorker';
import {Router, browserHistory, applyRouterMiddleware} from 'react-router'
import Routes from './routes'

import Relay from 'react-relay'
import useRelay from 'react-router-relay'
import {RelayNetworkLayer, urlMiddleware} from 'react-relay-network-layer'
import {relayApi} from './config/endpoints'
import auth from './utils/auth'

const rootEl = document.getElementById('root')

const createHeaders = () => {
  let idToken = auth.getToken()
  return idToken
    ? {Authorization: `Bearer ${idToken}` }
    : {}
}

Relay.injectNetworkLayer(
  new RelayNetworkLayer([
    urlMiddleware({
      url: (req) => relayApi
    }),
    next => req => {
      req.headers = {
        ...req.headers,
        ...createHeaders()
      }
      return next(req)
    }
  ], {disableBatchQuery: true})
)
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
  module.hot.accept()
}
