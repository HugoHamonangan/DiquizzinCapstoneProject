import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { db, auth } from './firebase';
import { doc, setDoc } from 'firebase/firestore';

export const signUp = async (
  email: string,
  password: string,
  userData: object
) => {
  try {
    const user = await createUserWithEmailAndPassword(auth, email, password);
    await setDoc(doc(db, 'users', user.user.uid), {
      ...userData,
      uid: user.user.uid,
    });
    return user.user;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

export const signIn = async (email: string, password: string) => {
  try {
    const response = await signInWithEmailAndPassword(auth, email, password);
    return response.user;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

export const logout = async () => {
  try {
    await auth.signOut();
  } catch (error) {
    return error;
  }
};
