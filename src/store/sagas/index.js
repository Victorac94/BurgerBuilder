// takeEvery nos permite escuchar ciertas acciones y hacer algo cuando ocurran
import { takeEvery, all, takeLatest } from 'redux-saga/effects';

import * as actionTypes from '../actions/actionTypes';
import { logoutSaga, checkAuthTimeoutSaga, authUserSaga, authCheckStateSaga } from './auth';
import { initIngredientsSaga } from './burgerBuilder';
import { purchaseBurgerSaga, fetchOrdersSaga } from './order';

// Cuando se ejecute watchAuth() pondremos un listener a la acción .AUTH_INITIATE_LOGOUT la cual ejecutará logoutSaga
export function* watchAuth() {
  // all() nos permite correr varios 'yield' de forma simultánea en caso de codigo asíncrono (como axios)
  // por lo demas es como poner un 'yield' normal
  yield all([
    takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga),
    takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga),
    takeEvery(actionTypes.AUTH_USER, authUserSaga),
    takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga)
  ])
}

export function* watchBurgerBuilder() {
  yield takeEvery(actionTypes.INIT_INGREDIENTS, initIngredientsSaga);
}

export function* watchOrder() {
  // takeLatest() se diferencia de takeEvery() en que si hay varias ejecuciones de por ejemplo purchaseBurgerSaga,
  // solo va a terminar de ejecutar la última que le hayamos dicho (para que solo se esté ejecutando una acción a la vez)
  // (Por ejemplo si un usuario clicka muchas veces seguidas en el botón de purchase)
  yield takeLatest(actionTypes.PURCHASE_BURGER, purchaseBurgerSaga);
  yield takeEvery(actionTypes.FETCH_ORDERS, fetchOrdersSaga);
}

/*
  Más info en https://redux-saga.js.org/docs/api/
  El propósito principal de redux-saga es tener sólo las acciones (código síncrono) en un archivo
  y el código que tenga side-effects (código asíncrono) por otro lado (en las sagas), de esta manera está todo
  mejor ordenado.
*/
