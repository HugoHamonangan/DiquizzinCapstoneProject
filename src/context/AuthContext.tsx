import { onAuthStateChanged } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '../firebase/firebase';

const userContext = createContext();

export function UserAuth() {
  return useContext(userContext);
}

export default function AuthContextProvider({ children }) {
  // const [isLoggedOut, setIsLoggedOut] = useState(true);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        // setIsLoggedOut(false);

        onSnapshot(doc(db, 'users', currentUser.uid), (doc) => {
          setUser(doc.data());
          setLoading(false); // Set loading to false after setting user
        });
        // setUser(currentUser);

        console.log('It ran again');
      } else {
        // setIsLoggedOut(true);
        setUser(null);
        setLoading(false); // Set loading to false after setting user
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return <userContext.Provider value={{ user }}>{!loading && children}</userContext.Provider>;
}
