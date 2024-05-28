import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { db } from './firebase';

const generateRandomID = () => {
  const chars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomID = '';

  for (let i = 0; i < 16; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomID += characters.charAt(randomIndex);
  }
  return randomID;
};

export const createData = async (collectionName, data) => {
  const id = generateRandomID();
  try {
    const docRef = doc(db, collectionName, id);
    await setDoc(docRef, {
      id,
      ...data,
    });
  } catch (error) {
    console.error('Error while adding document: ', error.message);
  }
};

export const readData = async (collection, id) => {
  try {
    const docRef = doc(db, collection, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log('Document data: ', docSnap.data());
      return docSnap.data();
    } else {
      console.log('No such document!');
    }
  } catch (error) {
    console.error('Error while reading document: ', error.message);
  }
};

export const updateData = async (
  collection: string,
  id: string,
  data: object
) => {
  try {
    const docRef = doc(db, collection, id);
    await updateDoc(docRef, {
      id: id,
      ...data,
    });
  } catch (error) {
    console.error('Error while updating document: ', error.message);
  }
};

export const deleteData = async (collection: string, id: string) => {
  try {
    const docRef = doc(db, collection, id);
    await deleteDoc(docRef);

    console.log('Document successfully deleted!');
  } catch (error) {
    console.log('Error while deleting document: ', error.message);
  }
};

export const readAllData = async (collectionName) => {
  try {
    const newDataArr = [];
    const querySnapshot = await getDocs(collection(db, collectionName));
    querySnapshot.forEach((doc) => {
      // console.log(doc.id, ' => ', doc.data());
      newDataArr.push(doc.data());
    });
    console.log(newDataArr);
    return newDataArr;
  } catch (error) {
    console.error('Error while reading collection: ', error.message);
  }
};

export const listenToCollection = (collectionName, callback) => {
  const collectionRef = collection(db, collectionName);

  return onSnapshot(collectionRef, (querySnapshot) => {
    const newDataArr = [];
    querySnapshot.forEach((doc) => {
      newDataArr.push(doc.data());
    });
    callback(newDataArr);
  });
};
