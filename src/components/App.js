import React, { Component } from 'react';
import { Router, Switch, Route } from 'react-router';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import listApp from '../reducers/index.js';
import createBrowserHistory from 'history/createBrowserHistory';

import { saveState, loadState } from '../storageManager.js';
import List from './links-list/List.js';
import AddItem from './add-items/AddItem.js';


const history = createBrowserHistory();
const store = createStore(listApp, loadState(), applyMiddleware(logger));

store.subscribe(() => { saveState(store.getState()) });

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <Route
              exact
              path='/list'
              component={List}
            />
            <Route
              path='/'
              component={List}
            />
            <Route
              exact
              path='/additem'
              component={AddItem}
            />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
