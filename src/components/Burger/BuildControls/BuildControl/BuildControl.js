import React from 'react';
import classes from './BuildControl.css';

const buildControl = (props) => (
  <div className={classes.BuildControl}>
    <div className={classes.Label}>{props.label} <span>({props.quantity[props.label.toLowerCase()]})</span></div>
    <button
      className={classes.More}
      onClick={props.more} >+</button>
    <button
      className={classes.Less}
      onClick={props.less}
      disabled={props.disabled}>-</button>
  </div>
)

export default buildControl;
