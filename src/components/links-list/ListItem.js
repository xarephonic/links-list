import React from 'react';

const ListItem = ({
  title = '',
  url = '',
  points = ''
}) => (
  <div>
    <div>{title}</div>
    <a href={url}>{url}</a>
    <div>{points}</div>
  </div>
);

export default ListItem;
