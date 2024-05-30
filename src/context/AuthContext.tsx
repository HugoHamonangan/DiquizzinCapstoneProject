import { onAuthStateChanged } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import { auth, db } from '../firebase/firebase';

interface ProviderData {
  providerId: string;
  uid: string;
  displayName: string | null;
  email: string | null;
  phoneNumber: string | null;
  photoURL: string | null;
}

interface User {
  email: string;
  displayName: string | null;
  emailVerified: boolean;
  isAnonymous: boolean;
  lastLoginAt: string;
  phoneNumber: string | null;
  photoURL: string | null;
  providerData: ProviderData[];
  stsTokenManager: {
    refreshToken: string;
    accessToken: string;
    expirationTime: number;
  };
  uid: string;
  name: string;
}

interface UserAuthType {
  user: User | null;
}

const userContext = createContext<UserAuthType | undefined>(undefined);

export function UserAuth(): UserAuthType {
  const context = useContext(userContext);
  if (!context) {
    throw new Error('useUserAuth must be used within a UserProvider');
  }
  return context;
}

interface AuthContextProviderProps {
  children: ReactNode;
}

export default function   AuthContextProvider({
  children,
}: AuthContextProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log('Auth state changed, current user:', currentUser);
      if (currentUser) {
        onSnapshot(
          doc(db, 'users', currentUser.uid),
          (docSnapshot) => {
            if (docSnapshot.exists()) {
              const userData = docSnapshot.data() as User;
              console.log('Document data:', userData);
              setUser(userData);
            } else {
              console.log('No such document!');
              setUser(null);
            }
            setLoading(false); // Set loading to false after setting user
          },
          (error) => {
            console.error('Error fetching document:', error);
            setLoading(false);
          }
        );
      } else {
        setUser(null);
        setLoading(false); // Set loading to false after setting user
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <userContext.Provider value={{ user }}>
      {!loading && children}
    </userContext.Provider>
  );
}
