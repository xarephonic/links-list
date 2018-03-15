import React from 'react';
import ReactDOM from 'react-dom';
import App from '../components/App.js';

import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import listApp from '../reducers/index.js';
import { addItem, removeItem, upvote, downvote, orderBy } from '../components/links-list/ducks/index.js';

const linkItemComparator = (linkObjA, linkObjB) => {
  return linkObjA.name === linkObjB.name && linkObjA.url === linkObjB.url && linkObjA.points === linkObjB.points
}

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

it('added item is at top of list', () => {
  const store = createStore(listApp, applyMiddleware(thunk));

  const itemsToAdd = [
    {
      name: 'nyan cat',
      url: 'www.nyan.cat'
    },
    {
      name: 'google',
      url: 'www.google.com'
    }
  ];

  store.dispatch(addItem(itemsToAdd[0]));
  store.dispatch(addItem(itemsToAdd[1]));

  const isEqual = linkItemComparator(store.getState().linksList.linksArr[0], { ...itemsToAdd[1], points: 0 });

  expect(isEqual).toBe(true);
});

it('add item with already existing name to list', () => {
  const store = createStore(listApp, applyMiddleware(thunk));

  const itemToAdd = {
    name: 'nyan cat',
    url: 'www.nyan.cat'
  };
  const duplicateNamedItem = {
    name: 'nyan cat',
    url: 'www.google.com'
  };

  store.dispatch(addItem(itemToAdd));
  store.dispatch(addItem(duplicateNamedItem));

  expect(store.getState().linksList.linksArr.length).toBe(1);
  expect(store.getState().notification.showToast).toBe(true);
  expect(store.getState().notification.toast.message).toBe(`The item you are trying to add already exists as ${itemToAdd.name} - ${itemToAdd.url}`);
  expect(store.getState().notification.toast.color).toBe('danger');
});

it('add item with already existing url to list', () => {
  const store = createStore(listApp, applyMiddleware(thunk));

  const itemToAdd = {
    name: 'nyan cat',
    url: 'www.nyan.cat'
  };
  const duplicateNamedItem = {
    name: 'google',
    url: 'www.nyan.cat'
  };

  store.dispatch(addItem(itemToAdd));
  store.dispatch(addItem(duplicateNamedItem));

  expect(store.getState().linksList.linksArr.length).toBe(1);
  expect(store.getState().notification.showToast).toBe(true);
  expect(store.getState().notification.toast.message).toBe(`The item you are trying to add already exists as ${itemToAdd.name} - ${itemToAdd.url}`);
  expect(store.getState().notification.toast.color).toBe('danger');
});

it('remove item from list', () => {
  const store = createStore(listApp, applyMiddleware(thunk));

  const itemToRemove = {
    name: 'nyan cat',
    url: 'www.nyan.cat'
  };

  store.dispatch(addItem(itemToRemove));
  store.dispatch(removeItem(itemToRemove));

  expect(store.getState().linksList.linksArr.length).toBe(0);
});

it('remove non-existent item from list', () => {
  const store = createStore(listApp, applyMiddleware(thunk));

  const itemToAdd = {
    name: 'nyan cat',
    url: 'www.nyan.cat'
  };

  store.dispatch(addItem(itemToAdd));
  store.dispatch(removeItem({
    name: 'nyan cat',
    url: 'www.google.com',
    points: 0
  }));

  expect(store.getState().linksList.linksArr.length).toBe(1);
});

it('upvote item', () => {
  const store = createStore(listApp, applyMiddleware(thunk));

  const itemToUpvote = {
    name: 'nyan cat',
    url: 'www.nyan.cat'
  };

  store.dispatch(addItem(itemToUpvote));
  store.dispatch(upvote({ ...itemToUpvote, points: 0}));

  expect(store.getState().linksList.linksArr[0].points).toBe(1);
});

it('downvote item', () => {
  const store = createStore(listApp, applyMiddleware(thunk));

  const itemToDownvote = {
    name: 'nyan cat',
    url: 'www.nyan.cat'
  };

  store.dispatch(addItem(itemToDownvote));
  store.dispatch(downvote({ ...itemToDownvote, points: 0}));

  expect(store.getState().linksList.linksArr[0].points).toBe(-1);
});

it('voted item is at correct position', () => {
  const store = createStore(listApp, applyMiddleware(thunk));

  const itemsToAdd = [
    {
      name: 'nyan cat',
      url: 'www.nyan.cat'
    },
    {
      name: 'google',
      url: 'www.google.com'
    }
  ];

  store.dispatch(addItem(itemsToAdd[0]));
  store.dispatch(addItem(itemsToAdd[1]));
  store.dispatch(orderBy("0"));
  store.dispatch(upvote({ ...itemsToAdd[0], points: 0}));

  expect(linkItemComparator(store.getState().linksList.linksArr[0], { ...itemsToAdd[0], points: 1})).toBe(true);

  store.dispatch(orderBy("1"));

  expect(linkItemComparator(store.getState().linksList.linksArr[1], { ...itemsToAdd[0], points: 1})).toBe(true);

  store.dispatch(downvote({ ...itemsToAdd[0], points: 1}));
  store.dispatch(downvote({ ...itemsToAdd[0], points: 0}));

  expect(linkItemComparator(store.getState().linksList.linksArr[0], { ...itemsToAdd[0], points: -1})).toBe(true);
});
