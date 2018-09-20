import React from 'react';
import classes from './DrawerToggle.css';

const DrawerToggle = (props) => (
  <div className={classes.Menu} onClick={props.clicked}>
    <ul>
      <li></li>
      <li></li>
      <li></li>
    </ul>
  </div>
)

export default DrawerToggle;
