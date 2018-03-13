import React, { Component } from 'react';
import { Router, Switch, Route } from 'react-router';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import listApp from '../reducers/index.js';
import createBrowserHistory from 'history/createBrowserHistory';

import { saveState, loadState } from '../storageManager.js';
import List from './links-list/List.js';
import AddItem from './add-items/AddItem.js';
import NoMatch from './nomatch/NoMatch.js';
import Toast from './notifications/Toast.js';


const history = createBrowserHistory();
const store = createStore(listApp, loadState(), applyMiddleware(thunk, logger));

store.subscribe(() => { saveState(store.getState()) });

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <React.Fragment>
          <Toast />
          <Router history={history}>
            <Switch>
              <Route
                exact
                path='/list'
                component={List}
              />
              <Route
                exact
                path='/additem'
                component={AddItem}
              />
              <Route
                component={NoMatch}
              />
            </Switch>
          </Router>
        </React.Fragment>
      </Provider>
    );
  }
}

export default App;
