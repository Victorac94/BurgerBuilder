import { delay } from 'redux-saga'; // retrasa la ejecución del siguiente paso
import { put, call } from 'redux-saga/effects'; // 'put' despacha una nueva acción
import axios from 'axios';

import * as actions from '../actions/index';

// Esto es una saga
export function* logoutSaga(action) {
  // En vez de usar localStorage.removeItem("token") podemos usar call(), lo que nos permite testear los generadores (generators)
  //    yield call([localStorage, "removeItem", "token"]);
  // El primer argumento de call() es un array en el que especificamos primero el objeto y despues la función de ese
  // objeto que queremos correr. Despues ponemos los parametros de esa función en el resto de argumentos
  yield localStorage.removeItem("token");
  yield localStorage.removeItem("expirationDate");
  yield localStorage.removeItem("userId");
  yield put(actions.logoutSucceed());
}

// Esto es una saga
export function* checkAuthTimeoutSaga(action) {
  yield delay(action.expirationTime * 1000); // Esperamos un tiempo a que el token expire
  yield put(actions.logout()); // Cuando ha pasado ese tiempo nos deslogueamos
}

export function* authUserSaga(action) {
  yield put(actions.authStart());
  const authData = {
    email: action.email,
    password: action.password,
    returnSecureToken: true
  };
  //Crear un nuevo usuario
  let url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyBq8mkxB3DfoBFbSpTdSnVQdyWHAhxTYfo";
  //Logear al usuario existente
  if (action.isSignup) {
    url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyBq8mkxB3DfoBFbSpTdSnVQdyWHAhxTYfo";
  }
  try {
    const response = yield axios.post(url, authData)
    const expirationDate = yield new Date(new Date().getTime() + response.data.expiresIn * 1000);

    yield localStorage.setItem("token", response.data.idToken);
    yield localStorage.setItem("expirationDate", expirationDate);
    yield localStorage.setItem("userId", response.data.localId);
    yield put(actions.authSuccess(response.data.idToken, response.data.localId));
    yield put(actions.checkAuthTimeout(response.data.expiresIn));
  } catch (error) {
    yield put(actions.authFail(error.response.data.error));
  }
}

export function* authCheckStateSaga (action) {
  const token = yield localStorage.getItem("token");
  if (!token) {
    yield put(actions.logout());
  } else {
    const expirationDate = yield new Date(localStorage.getItem("expirationDate"));

    if (expirationDate <= new Date()) {
      yield put(actions.logout());
    } else {
      const userId = yield localStorage.getItem("userId");
      yield put(actions.authSuccess(token, userId));
      yield put(actions.checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000))
      /* Lo dividimos entre 1000 porque el resultado de la resta esta en milisegundos y a
         checkAuthTimeout() le queremos pasar el parametro en segundos */
    }
  }
}
