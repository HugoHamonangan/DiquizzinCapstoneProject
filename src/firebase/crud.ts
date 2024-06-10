import { collection, deleteDoc, doc, getDoc, getDocs, onSnapshot, setDoc, updateDoc } from 'firebase/firestore';
import { db } from './firebase';

interface Data {
  // Define the structure of your data object here
}

const generateRandomID = (): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomID = '';

  for (let i = 0; i < 16; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    randomID += chars.charAt(randomIndex);
  }
  return randomID;
};

export const createData = async (collectionName: string, data: Data): Promise<void> => {
  const id = generateRandomID();
  try {
    const docRef = doc(db, collectionName, id);
    await setDoc(docRef, {
      id,
      ...data,
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error while adding document: ', error.message);
    }
  }
};

export const readData = async (collectionName: string, id: string): Promise<Data | null> => {
  try {
    const docRef = doc(db, collectionName, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log('Document data: ', docSnap.data());
      return docSnap.data() as Data;
    } else {
      console.log('No such document!');
      return null;
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error while reading document: ', error.message);
    }
    return null;
  }
};

export const updateData = async (collectionName: string, id: string, data: Partial<Data>): Promise<void> => {
  try {
    const docRef = doc(db, collectionName, id);
    await updateDoc(docRef, {
      id: id,
      ...data,
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error while updating document: ', error.message);
    }
  }
};

export const deleteData = async (collectionName: string, id: string): Promise<void> => {
  try {
    const docRef = doc(db, collectionName, id);
    await deleteDoc(docRef);
    console.log('Document successfully deleted!');
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error while deleting document: ', error.message);
    }
  }
};

export const readAllData = async (collectionName: string): Promise<Data[]> => {
  try {
    const newDataArr: Data[] = [];
    const querySnapshot = await getDocs(collection(db, collectionName));
    querySnapshot.forEach((doc) => {
      newDataArr.push(doc.data() as Data);
    });
    console.log(newDataArr);
    return newDataArr;
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error while reading collection: ', error.message);
    }
    return [];
  }
};

export const listenToCollection = (collectionName: string, callback: (data: Data[]) => void) => {
  const collectionRef = collection(db, collectionName);

  return onSnapshot(collectionRef, (querySnapshot) => {
    const newDataArr: Data[] = [];
    querySnapshot.forEach((doc) => {
      newDataArr.push(doc.data() as Data);
    });
    callback(newDataArr);
  });
};
