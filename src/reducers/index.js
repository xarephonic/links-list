import { combineReducers } from 'redux';
import linksList from '../components/links-list/ducks/index.js';
import addItems from '../components/add-items/ducks/index.js';

const listApp = combineReducers({
  linksList,
  addItems
});

export default listApp;
