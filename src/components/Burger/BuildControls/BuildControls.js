import React from 'react';
import BuildControl from './BuildControl/BuildControl';
import classes from './BuildControls.css';

const controls = [
  {label: 'Salad', type: 'salad'},
  {label: 'Bacon', type: 'bacon'},
  {label: 'Cheese', type: 'cheese'},
  {label: 'Meat', type: 'meat'}
]

const buildControls = (props) => (
  <div className={classes.BuildControls}>
    <p><strong>Total Price:</strong> €{props.totalPrice.toFixed(2)}</p>
    {controls.map( ctrl => (
      <BuildControl
        key={ctrl.label}
        label={ctrl.label}
        quantity={props.ings}
        more={() => props.ingredientAdded(ctrl.type)}
        less={() => props.ingredientRemoved(ctrl.type)}
        disabled={props.disabled[ctrl.type]} />
    ))}
    <button
      className={classes.OrderButton}
      disabled={!props.purchasable}
      onClick={props.ordered}>{props.isAuth ? 'ORDER NOW' : 'SIGN UP TO ORDER'}</button>
  </div>
)

export default buildControls;
