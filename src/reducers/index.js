import { combineReducers } from 'redux';
import linksList from '../components/links-list/ducks/index.js';
import notification from '../components/notifications/ducks/index.js';

const listApp = combineReducers({linksList, notification});

export default listApp;
