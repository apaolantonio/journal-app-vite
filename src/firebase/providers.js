import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { FirebaseAuth } from "./config";

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(FirebaseAuth, googleProvider);
    // const credentials = GoogleAuthProvider.credentialFromResult(result);

    const { displayName, email, photoURL, uid } = result.user;
    return {
      status: true,
      displayName,
      email,
      photoURL,
      uid,
    };
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    return {
      status: false,
      errorCode,
      errorMessage,
    };
  }
};

export const registerUserWithEmailPassword = async ({
  email,
  password,
  displayName,
}) => {
  try {
    const r = await createUserWithEmailAndPassword(
      FirebaseAuth,
      email,
      password
    );
    const { uid, photoURL } = r;

    // TODO actualizar el displayName en Firebase
    updateProfile(FirebaseAuth.currentUser, { displayName });
    return {
      status: true,
      uid,
      photoURL,
      email,
      displayName,
    };
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    return {
      status: false,
      errorCode,
      errorMessage,
    };
  }
};

export const loginUserWithEmailPassword = async ({ email, password }) => {
  try {
    const r = await signInWithEmailAndPassword(FirebaseAuth, email, password);
    const { uid, displayName, photoURL } = r.user;
    return {
      status: true,
      uid,
      displayName,
      photoURL,
    };
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    return {
      status: false,
      errorCode,
      errorMessage,
    };
  }
};

export const logoutFirebase = async () => {
  return await FirebaseAuth.signOut();
};
