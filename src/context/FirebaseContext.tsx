import { FacebookAuthProvider, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from 'firebase/auth';
import { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import useFirebase from '../hooks/useFirebase';
import { AuthUser } from '../types';

// ==================== TYPES ====================
interface FirebaseContextProps {
  isNormalAccount: boolean;
  connectWithGoogle: () => void;
  connectWithFacebook: () => void;
  user: AuthUser;
}

const FirebaseContext = createContext({} as FirebaseContextProps);

const useFirebaseContext = () => {
  return useContext(FirebaseContext);
};

export { useFirebaseContext };

function FirebaseProvider({ children }: { children: React.ReactNode }) {
  const { isFirebaseInitialized } = useFirebase();
  const [isNormalAccount, setIsNormalAccount] = useState(false);
  const [user, setUser] = useState<AuthUser>({
    uid: '',
    displayName: '',
    email: '',
    phoneNumber: '',
    accessToken: '',
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

  const connectWithFacebook = async () => {
    const provider = new FacebookAuthProvider();
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

    const listener = (newUser: any) => {
      if (newUser) {
        setUser(newUser);
        setIsNormalAccount(true);
        toast.success('You have signed in successfully!');
      } else {
        setIsNormalAccount(false);
      }
    };

    onAuthStateChanged(auth, listener);
  }, []);

  return (
    <FirebaseContext.Provider
      value={{
        isNormalAccount,
        connectWithGoogle,
        connectWithFacebook,
        user,
      }}
    >
      {isFirebaseInitialized ? children : <Loader text="Connecting to Firestore..." />}
    </FirebaseContext.Provider>
  );
}

export default FirebaseProvider;
