import React from 'react';
import { Link } from 'react-router-dom';

const NoMatch = () => (
  <div>
    <img src='https://media2.giphy.com/media/10j1sRnpiklXB6/giphy.gif' />
    <p> There is no such page. Sorry! </p>
    <Link to='/list'>Back to main page</Link>
  </div>

);

export default NoMatch;
