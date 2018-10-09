import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from "../../hoc/Auxiliary/Auxiliary";
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
// En el import de arriba, podríamos omitir el '/index' ya que si apuntamos a una carpeta y
// hay un archivo llamado index.js el programa escogerá automaticamente ese archivo
import axios from '../../axios-orders';

// Aquí lo exportamos como 'nammed export' para usarlo con el .test.js sin que interfiera el connect() de react-redux
export class BurgerBuilder extends Component {
  state = {
    purchasing: false
  }

  componentDidMount () {
    this.props.onInitIngredients();
  }

  updatePurchaseStateHandler = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map( igKey => {
        return ingredients[igKey];
      }).reduce( (total, curr) => {
        return total + curr;
      }, 0);
    return sum > 0;
  }

  purchaseHandler = () => {
    if (this.props.isAuthenticated) {
      this.setState({purchasing: true});
    } else {
      //Redirecciona al checkout despues de logearnos/registrarnos si ya estabamos haciendo una hamburguesa
      this.props.onSetAuthRedirectPath("/checkout");
      this.props.history.push("/auth");
    }
  }

  purchaseCancelHandler = () => {
    this.setState({purchasing: false})
  }

  purchaseContinueHandler = () => {
    this.props.onInitPurchase();
    this.props.history.push('/checkout');
  }

  render () {
    const disabledInfo = {
      ...this.props.ings
    }
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = <Spinner />;

    let burger = this.props.error ? <p>Ingredients can't be loaded</p> : <Spinner />;

    if (this.props.ings) {
      burger = (
      <Aux>
        <h1 style={{textAlign: 'center', color: '#CB6914'}}>Welcome to BURGER BUILDER!</h1>
        <Burger ingredients={this.props.ings} />
        <BuildControls
          ingredientAdded={this.props.onIngredientAdded}
          ingredientRemoved={this.props.onIngredientRemoved}
          ings={this.props.ings}
          disabled={disabledInfo}
          totalPrice={this.props.price}
          purchasable={this.updatePurchaseStateHandler(this.props.ings)}
          ordered={this.purchaseHandler}
          isAuth={this.props.isAuthenticated}/>
      </Aux>
      )
      orderSummary = <OrderSummary
          ingredients={this.props.ings}
          totalPrice={this.props.price}
          purchaseCancelled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}>
        </OrderSummary>
    }

    return (
      <Aux>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    )
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: ingName => dispatch(actions.addIngredient(ingName)),
    onIngredientRemoved: ingName => dispatch(actions.removeIngredient(ingName)),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onInitPurchase: () => dispatch(actions.purchaseInit()),
    onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
  }
}

// Aquí lo exportamos como default con connect para usarlo con normalidad (no para testing)
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
