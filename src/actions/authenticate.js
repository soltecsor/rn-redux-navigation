import { AsyncStorage } from "react-native";
import { DATA_SESSION } from "../config/global";

import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILED,
  RESTORE_SESSION,
  RESTORE_REQUEST,
  RESTORE_FAILED
} from "../config/redux-action-types/authenticate";

export function login(email, password) { 
  return async dispatch => {
    dispatch(loginRequest()); 
    try {
      if (email.trim() === "ftmuffo@gmail.com" && password === "123456") { 
        const session = { token: "abc1234", email: email, username: "Fabiano" } 
        await AsyncStorage.setItem(DATA_SESSION, JSON.stringify(session)) 
        setTimeout(() => { 
          dispatch(loginSuccess(session)) 
        }, 1500)
      } else { 
        setTimeout(() => { 
          dispatch(loginFailed("Email ou Senha incorretos"))
        }, 1500)
      }
    } catch (err) { 
      console.log(err)
      dispatch(loginFailed("Algo deu errado"));
    }
  };
} // login

export function restoreSession() { 
  return async dispatch => {
    dispatch(restoreRequest()); 
    try {
      const session = await AsyncStorage.getItem(DATA_SESSION) 
      if (session != null) { 
        dispatch(loginSuccess(JSON.parse(session))) 
      } else { 
        dispatch(restoreFailed())
      }
    } catch (err) { 
      dispatch(restoreFailed())
    }
  };
} // restoreSession

export function logout() { 
  return async dispatch => {
    dispatch(logoutRequest()) 
    try {
      setTimeout(async () => { 
        await AsyncStorage.removeItem(DATA_SESSION); 
        dispatch(logoutSuccess()) 
      }, 1500)
    } catch (err) { 
      dispatch(logoutFailed("Algo deu errado"))
    }
  }
} // logout

function loginRequest() {
  return {
    type: LOGIN_REQUEST
  };
} //loginRequest

function loginSuccess(session) {
  return {
    type: LOGIN_SUCCESS,
    data: {
      session
    }
  };
} // loginSuccess

function loginFailed(error) {
  if (!error) {
    error = "Network Error";
  }
  return {
    type: LOGIN_FAILED,
    data: {
      error: error
    }
  };
} // loginFailed

function logoutRequest() {
  return {
    type: LOGOUT_REQUEST
  };
} //logoutRequest

function logoutSuccess() {
  return {
    type: LOGOUT_SUCCESS,
  };
} // logoutSuccess

function logoutFailed(error) {
  if (!error) {
    error = "Network Error";
  }
  return {
    type: LOGOUT_FAILED,
    data: {
      error: error
    }
  };
} // logoutFailed

function restoreRequest() {
  return {
    type: RESTORE_REQUEST
  };
} //restoreRequest

function restoreFailed() {
  return {
    type: RESTORE_FAILED
  };
} //restoreFailed
