import {
  loginUserWithEmailPassword,
  logoutFirebase,
  registerUserWithEmailPassword,
  signInWithGoogle,
} from "../../firebase/providers";
import { checkingCredential, logout, login } from "./";

export const checkingAuthentication = (email, password) => {
  return async (dispatch) => {
    dispatch(checkingCredential());
  };
};

export const startGoogleSignIn = () => {
  console.log("On Google Sign In");
  return async (dispatch) => {
    dispatch(checkingCredential());
    const result = await signInWithGoogle();
    if (!result.status) {
      return dispatch(logout(result.errorMessage));
    }

    dispatch(login(result));
  };
};

export const startRegisteringEmailPassword = ({
  email,
  password,
  displayName,
}) => {
  return async (dispatch) => {
    dispatch(checkingCredential());
    const { status, errorMessage, uid, photoURL } =
      await registerUserWithEmailPassword({
        email,
        password,
        displayName,
      });
    console.log("Status: ", status);
    if (!status) {
      return dispatch(logout({ errorMessage }));
    }

    dispatch(login({ uid, displayName, email, photoURL }));
  };
};

export const startLoginEmailPassword = ({ email, password }) => {
  console.log({ email, password });
  return async (dispatch) => {
    dispatch(checkingCredential());
    const { status, errorMessage, uid, displayName, photoURL } =
      await loginUserWithEmailPassword({ email, password });
    console.log("Status: ", status);
    if (!status) {
      return dispatch(logout({ errorMessage }));
    }

    dispatch(login({ uid, displayName, email, photoURL }));
  };
};

export const startLogout = () => {
  return async (dispatch) => {
    await logoutFirebase();
    dispatch(logout({}));
  };
};
