import React from 'react';
import ReactDOM from 'react-dom';
import App from '../components/App.js';

/*
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});*/

import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import listApp from '../reducers/index.js';
import { addItem } from '../components/links-list/ducks/index.js';

it('add item to list', () => {
  const store = createStore(listApp, applyMiddleware(thunk));

  const itemToAdd = {
    name: 'nyan cat',
    url: 'www.nyan.cat'
  };

  store.dispatch(addItem(itemToAdd));

  const addedItem = store.getState().linksList.linksArr[0];

  expect(addedItem.name).toBe(itemToAdd.name);
  expect(addedItem.url).toBe(itemToAdd.url);
  expect(addedItem.points).toBe(0);
});
