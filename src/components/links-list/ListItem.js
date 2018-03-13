import React from 'react';

const ListItem = ({
  name = '',
  url = '',
  points = ''
}) => (
  <li>
    <div>{name}</div>
    <a href={url}>{url}</a>
    <div>{points}</div>
  </li>
);

export default ListItem;
