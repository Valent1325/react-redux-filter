import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router';
import { ConnectedRouter } from 'connected-react-router';

import { store, history } from './app/store/store';

import App from './app/App';

import './index.scss';

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      {/* <React.StrictMode> */}
        <Switch>
          <Route path="/" component={App}></Route>
        </Switch>
      {/* </React.StrictMode> */}
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);
