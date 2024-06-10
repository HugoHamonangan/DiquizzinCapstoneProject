import { createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { db, auth } from './firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export const signUp = async (email: string, password: string, userData: object) => {
  try {
    const response = await createUserWithEmailAndPassword(auth, email, password);
    const user = response.user;
    await setDoc(doc(db, 'users', user.uid), {
      ...userData,
      uid: user.uid,
    });
    return user;
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

export const signInWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const response = await signInWithPopup(auth, provider);
    const user = response.user;

    // check if user already exists in Firestore
    const docRef = doc(db, 'users', user.uid);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      await setDoc(docRef, {
        name: user.displayName,
        email: user.email,
        score: 0,
        uid: user.uid,
      });
    }
    return user;
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
