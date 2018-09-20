import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
  building: false /*Es true si hemos empezado a crear una hamburguesa. Lo usamos para cuando le demos a
                    SIGN UP TO ORDER, para que se nos guarden los ingredientes seleccionados una vez nos
                    hayamos logeado/registrado */
};

const INGREDIENT_PRICES =  {
  salad: 0.5,
  bacon: 0.7,
  cheese: 0.6,
  meat: 1.2
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    /*
      Podemos cambiar el estado usando la función de '../../shared/utility.js' como en el siguiente caso.
      Esta manera de cambiar el estado se hace en la seccion 18, clase 303 del curso.
    */
    case actionTypes.ADD_INGREDIENT:
      const updatedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 };
      // Añadimos el nuevo contador del ingrediente en el objeto de ingredientes
      const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
      // Juntamos las diferentes propiedades en un unico state
      const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
        building: true
      }
      // Llamamos a la función para que actualice el state
      return updateObject(state, updatedState);
    /* O tambien podemos cambiar el estado como en el siguiente caso, en vez de con la función de '../../shared/utility.js' */
    case actionTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] - 1
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
        building: true
      }
    case actionTypes.SET_INGREDIENTS:
      return {
        ...state,
        ingredients: {
          salad: action.ingredients.salad,
          bacon: action.ingredients.bacon,
          cheese: action.ingredients.cheese,
          meat: action.ingredients.meat
        },
        totalPrice: 4,
        error: false,
        building: false
      }
    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return {
        ...state,
        error: true
      }
    default:
      return state;
  }
}

export default reducer;
