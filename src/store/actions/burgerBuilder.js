import * as actionTypes from './actionTypes';
// import axios from '../../axios-orders';

// Esto es código asíncrono pues solo estamos añadiendo o quitando ingredientes en el navegador
export const addIngredient = (name) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientName: name
  }
}

export const removeIngredient = (name) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName: name
  }
}

export const setIngredients = (ingredients) => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients: ingredients
  }
}

export const fetchIngredientsFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED
  }
}

export const initIngredients = () => {
  return {
    type: actionTypes.INIT_INGREDIENTS
  }
  // Hemos pasado el codigo a sagas (initIngredientsSaga)
  // return dispatch => {
  //   axios.get("https://react-my-burger-8a574.firebaseio.com/ingredients.json")
  //     .then(response => {
  //       dispatch(setIngredients(response.data));
  //     })
  //     .catch(error => {
  //       dispatch(fetchIngredientsFailed());
  //     })
  // }
}
