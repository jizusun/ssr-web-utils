import React from 'react';
import ReactDOM from 'react-dom';
// import registerServiceWorker from './registerServiceWorker';

// import {Router, browserHistory} from 'react-router';
// import Routes from './routes';


import {
  Router,
  Route,
  IndexRoute,
  Redirect,
  Link,
  IndexLink,
  hashHistory
} from 'react-router'

const rootEl = document.getElementById('root')

const App = (props) => (
   <div>
      <h1>App</h1>
      <ul>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/inbox">Inbox</Link></li>
      </ul>
      {props.children}
  </div>
)

const Inbox = (props) => (
    <div>
      <h2>Inbox</h2>
      {props.children}
    </div>
)

const Home = () => (
  <h3> Home </h3>
)


const About = () => (
  <h3> About </h3>
)

const Message = (props) => (
  <h3> {props.params.id} </h3>
)


const InboxStats = () => (
  <h3> Inbox Stats </h3>
)


ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="about" component={About} />
      <Route path="inbox" component={Inbox} >
        <IndexRoute component={InboxStats}/>
        <Route path="messages/:id" component={Message} />
      </Route>
    </Route>
  </Router>
), rootEl)


if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default
    ReactDOM.render(
      <NextApp />,
      rootEl
    )
  })
}
