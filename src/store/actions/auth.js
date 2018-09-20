/*
// import axios from 'axios';
  Lo importamos desde el paquete y no desde nuestra instance creada en 'src/axios-orders.js'
  porque queremos usar una URL diferente a la default de ese archivo.
*/

import * as actionTypes from './actionTypes';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = (idToken, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: idToken,
    userId: userId
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  };
};

export const logout = () => {
  // Comentamos las siguientes lineas porque manejamos la lógica con sagas en vez de desde aquí (logoutSaga)
  // localStorage.removeItem("token");
  // localStorage.removeItem("expirationDate");
  // localStorage.removeItem("userId");

  return {
    // Usariamos .AUTH_LOGOUT si no lo hicieramos mediantes 'sagas'
    // type: actionTypes.AUTH_LOGOUT
    type: actionTypes.AUTH_INITIATE_LOGOUT
  };
};

export const logoutSucceed = () => {
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

// Checkea si debemos seguir logueados tras actualizar la pagina
export const checkAuthTimeout = (expirationTime) => {
  return {
    type: actionTypes.AUTH_CHECK_TIMEOUT,
    expirationTime: expirationTime
  };
};

export const auth = (email, password, isSignup) => {
  return {
    type: actionTypes.AUTH_USER,
    email: email,
    password: password,
    isSignup: isSignup
  }
  // Comento el siguiente código porque lo hemos pasado para hacerlo con sagas (authUserSaga)
  // return dispatch => {
  //   dispatch(authStart());
  //   const authData = {
  //     email: email,
  //     password: password,
  //     returnSecureToken: true
  //   };
  //   let url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyBq8mkxB3DfoBFbSpTdSnVQdyWHAhxTYfo";
  //
  //   if (!isSignup) {
  //     url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyBq8mkxB3DfoBFbSpTdSnVQdyWHAhxTYfo";
  //   }
  //   axios.post(url, authData)
  //     .then(response => {
  //       const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
  //
  //       localStorage.setItem("token", response.data.idToken);
  //       localStorage.setItem("expirationDate", expirationDate);
  //       localStorage.setItem("userId", response.data.localId);
  //       dispatch(authSuccess(response.data.idToken, response.data.localId));
  //       dispatch(checkAuthTimeout(response.data.expiresIn));
  //     })
  //     .catch(err => {
  //       dispatch(authFail(err.response.data.error))
  //     });
  // };
};

export const setAuthRedirectPath = (path) => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path
  }
}

export const authCheckState = () => {
  return {
    type: actionTypes.AUTH_CHECK_STATE
  }
  // Comentamos el codigo porque lo hemos pasado a hacer con sagas (authCheckStateSaga)
  // return dispatch => {
  //   const token = localStorage.getItem("token");
  //   if (!token) {
  //     dispatch(logout());
  //   } else {
  //     const expirationDate = new Date(localStorage.getItem("expirationDate"));
  //
  //     if (expirationDate <= new Date()) {
  //       dispatch(logout());
  //     } else {
  //       const userId = localStorage.getItem("userId");
  //       dispatch(authSuccess(token, userId));
  //       dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000))
  //       /* Lo dividimos entre 1000 porque el resultado de la resta esta en milisegundos y a
  //          checkAuthTimeout() le queremos pasar el parametro en segundos */
  //     }
  //   }
  // }
}
