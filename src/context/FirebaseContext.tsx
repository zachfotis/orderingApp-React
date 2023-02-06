import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInAnonymously, signInWithPopup } from 'firebase/auth';
import { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import useFirebase from '../hooks/useFirebase';
import { AuthUser } from '../types';

// ==================== TYPES ====================
interface FirebaseContextProps {
  isAnonymousAccount: boolean;
  isNormalAccount: boolean;
  connectWithGoogle: () => void;
  user: AuthUser;
}

const FirebaseContext = createContext({} as FirebaseContextProps);

const useFirebaseContext = () => {
  return useContext(FirebaseContext);
};

export { useFirebaseContext };

function FirebaseProvider({ children }: { children: React.ReactNode }) {
  const { isFirebaseInitialized } = useFirebase();
  const [isAnonymousAccount, setIsAnonymousAccount] = useState(false);
  const [isNormalAccount, setIsNormalAccount] = useState(false);
  const [user, setUser] = useState<AuthUser>({
    uid: '',
    displayName: '',
    email: '',
  });

  const connectWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    auth.useDeviceLanguage();
    try {
      await signInWithPopup(auth, provider);
    } catch (error: any) {
      toast.error(error?.message || 'Something went wrong');
    }
  };

  // ADD LISTENER TO AUTH STATE
  useEffect(() => {
    const auth = getAuth();

    const anonymousSignIn = async () => {
      try {
        const auth = getAuth();
        await signInAnonymously(auth);
      } catch (error: any) {
        toast.error(error?.message || 'Something went wrong');
      }
    };

    const listener = (newUser: any) => {
      if (newUser) {
        setUser(newUser);
        if (newUser.isAnonymous) {
          setIsAnonymousAccount(true);
          setIsNormalAccount(false);
          toast.info('You are browsing as a guest!');
        } else {
          setIsAnonymousAccount(false);
          setIsNormalAccount(true);
          toast.success('You have signed in successfully!');
        }
      } else {
        setIsAnonymousAccount(false);
        setIsNormalAccount(false);
        anonymousSignIn();
      }
    };

    onAuthStateChanged(auth, listener);
  }, []);

  return (
    <FirebaseContext.Provider
      value={{
        isAnonymousAccount,
        isNormalAccount,
        connectWithGoogle,
        user,
      }}
    >
      {isFirebaseInitialized ? children : <Loader text="Connecting to Firestore..." />}
    </FirebaseContext.Provider>
  );
}

export default FirebaseProvider;
