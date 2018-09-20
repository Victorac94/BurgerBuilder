import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  orders: [],
  loading: false,
  purchased: false
}

const purchaseInit = (state, action) => {
  return updateObject(state, { purchased: false });
};

const purchaseBurgerStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const purchaseBurgerSuccess = (state, action) => {
  const orderData = updateObject(action.orderData, { id: action.orderId});

  return updateObject(state, {
    loading: false,
    purchased: true,
    orders: state.orders.concat(orderData)
  });
};

const purchaseBurgerFail = (state, action) => {
  return updateObject(state, { loading: false });
}

const fetchOrdersStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const fetchOrdersSuccess = (state, action) => {
  return updateObject(state, { loading: false, orders: action.orders});
};

const fetchOrdersFail = (state, action) => {
  return updateObject(state, { loading: false });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_INIT: return purchaseInit(state, action)
    case actionTypes.PURCHASE_BURGER_START: return purchaseBurgerStart(state, action)
    case actionTypes.PURCHASE_BURGER_SUCCESS: return purchaseBurgerSuccess(state, action)
    case actionTypes.PURCHASE_BURGER_FAIL: return purchaseBurgerFail(state, action)
    case actionTypes.FETCH_ORDERS_START: return fetchOrdersStart(state, action)
    case actionTypes.FETCH_ORDERS_SUCCESS: return fetchOrdersSuccess(state, action)
    case actionTypes.FETCH_ORDERS_FAIL: return fetchOrdersFail(state, action)
    default:
      return state
      // Como tenemos varios reducers es importante tener un default que retorne el state
      // por si esa acción se maneja en el otro reducer
  }
};

export default reducer;


/////////////////////////////////////////////////////////////////////////////////////////////////

/*
En vez de actualizar el state con el 'utility function' (updateObject) podemos actualizarlo de la siguiente forma:
Mas info en la sección 18, clase 303 del curso.
*/

// const reducer = (state = initialState, action) => {
//   switch (action.type) {
//     case actionTypes.PURCHASE_INIT:
//       return {
//         ...state,
//         purchased: false
//       }
//     case actionTypes.PURCHASE_BURGER_START:
//       return {
//         ...state,
//         loading: true
//       }
//     case actionTypes.PURCHASE_BURGER_SUCCESS:
//       // Creamos esta constante para juntar la orderData con el orderId y pasar el objeto
//       // resultante al concat()
//       const newOrder = {
//         ...action.orderData,
//         id: action.orderId
//       }
//       return {
//         ...state,
//         loading: false,
//         purchased: true,
//         orders: state.orders.concat(newOrder)
//       }
//     case actionTypes.PURCHASE_BURGER_FAIL:
//       return {
//         ...state,
//         loading: false
//       }
//     case actionTypes.FETCH_ORDERS_START:
//       return {
//         ...state,
//         loading: true
//       }
//     case actionTypes.FETCH_ORDERS_SUCCESS:
//       return {
//         ...state,
//         orders: action.orders,
//         loading: false
//         }
//     case actionTypes.FETCH_ORDERS_FAIL:
//       return {
//         ...state,
//         loading: false
//       }
//     default:
//       return state
//       // Como tenemos varios reducers es importante tener un default que retorne el state
//       // por si esa acción se maneja en el otro reducer
//   }
// };
//
// export default reducer;
