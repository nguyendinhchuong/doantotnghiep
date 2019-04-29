import * as cst from "../constants";

export const logInSuccess = user => ({
  type: cst.LOG_IN_SUCCESS,
  user: user
});

export const onLogIn = () => {
  return (dispatch, getState) => {
    localStorage.setItem("user", true);
    console.log(localStorage.getItem("user"));
  };
};

export const logOutSuccess = user => ({
  type: cst.LOG_OUT_SUCCESS,
  user: user
});

export const onLogOut = () => {
  return (dispatch, getState) => {
    localStorage.removeItem("user");
    console.log(localStorage.getItem("user"));
  };
};
