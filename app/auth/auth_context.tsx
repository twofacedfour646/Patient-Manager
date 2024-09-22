"use client"
import { createContext, useReducer } from "react";

const initialState = {
  access_token: null
}

const AuthContext = createContext({
  access_token: null,
  login: (access_token: string) => {},
  logout: () => {}
});

function authReducer(state: any, action: any) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        access_token: action.payload
      };
    case "LOGOUT":
      return {
        ...state,
        access_token: null
      };
    default:
      return state
  }
}

function AuthProvider(props: any) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  function login(access_token: string) {
    dispatch({
      type: "LOGIN",
      payload: access_token
    });
  }

  function logout() {
    dispatch({
      type: "LOGOUT",
    });
  }

  return (
    <AuthContext.Provider value={{access_token: state.access_token, login, logout}} {...props}/>
  )
}

export {AuthContext, AuthProvider}
