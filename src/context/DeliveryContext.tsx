import { doc, getDoc, getFirestore, setDoc } from 'firebase/firestore';
import { AnimatePresence } from 'framer-motion';
import { createContext, useContext, useEffect, useMemo, useReducer, useState } from 'react';
import Loader from '../components/Loader';
import MenuItemOptions from '../components/store/MenuItemOptions';
import useLocalStorage from '../hooks/useLocalStorage';
import { BasketActionProps, basketReducer, BasketStateProps } from '../reducers/basketReducer';
import { ReducerActionProps, ReducerStateProps, userReducer } from '../reducers/userReducer';
import { AuthUser, BasketSelectedItem, Category, FirestoreUser, MenuItem, Store } from '../types';
import { baseURL } from '../utilities/server';
import { useFirebaseContext } from './FirebaseContext';

interface DeliveryContextProps {
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
  userInfoState: ReducerStateProps;
  userInfoDispatch: (value: ReducerActionProps) => void;
  stores: Store[];
  categories: Category[];
  setCategories: (value: Category[] | ((prev: Category[]) => Category[])) => void;
  showOptions: boolean;
  setShowOptions: (value: boolean) => void;
  replaceMenuItem: BasketSelectedItem | null;
  setReplaceMenuItem: (value: BasketSelectedItem | null) => void;
  activeMenuItem: MenuItem | null;
  setActiveMenuItem: (value: MenuItem | null) => void;
  activeStore: Store | null;
  setActiveStore: (value: Store | null) => void;
  basketState: BasketStateProps;
  basketDispatch: (value: BasketActionProps) => void;
  showBasket: boolean;
  setShowBasket: (value: boolean) => void;
  readyToSubmit: boolean;
}

const DeliveryContext = createContext({} as DeliveryContextProps);

const useDeliveryContext = () => {
  return useContext(DeliveryContext);
};

export { useDeliveryContext };

function DeliveryProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isDeliveryInitialized, setIsDeliveryInitialized] = useState(false);
  const { isNormalAccount, user } = useFirebaseContext();

  const addressStorage = useLocalStorage('address', '');
  const userStorage = useLocalStorage('userInfo', '');

  // State for the user info
  const [userInfoState, userInfoDispatch] = useReducer(userReducer, {
    firstName: userStorage.storedValue ? JSON.parse(userStorage.storedValue)?.firstName : '',
    lastName: userStorage.storedValue ? JSON.parse(userStorage.storedValue)?.lastName : '',
    email: userStorage.storedValue ? JSON.parse(userStorage.storedValue)?.email : '',
    phone: userStorage.storedValue ? JSON.parse(userStorage.storedValue)?.phone : '',
    payment: 'cash',
    isPhoneValid: false,
    isEmailValid: false,
    fullAddress: addressStorage.storedValue
      ? JSON.parse(addressStorage.storedValue)
      : {
          address: '',
          number: '',
          area: '',
          city: '',
          postalCode: '',
          lat: 0,
          lng: 0,
          confirmed: false,
        },
  });

  // State for the stores
  const [stores, setStores] = useState<Store[]>([]);
  const [activeStore, setActiveStore] = useState<Store | null>(null);

  // State fpr the categories of all stores
  const [categories, setCategories] = useState<Category[]>([]);

  // State for the basket of the current store
  const [basketState, basketDispatch] = useReducer(basketReducer, {
    store: null,
    totalItems: [],
  });
  const [showBasket, setShowBasket] = useState(true);

  // State for the options for the selected menu item
  const [showOptions, setShowOptions] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState<MenuItem | null>(null);
  const [replaceMenuItem, setReplaceMenuItem] = useState<BasketSelectedItem | null>(null);

  // State for order submission ready
  const [readyToSubmit, setReadyToSubmit] = useState(false);

  // State for backend status
  const [isBackendConnected, setIsBackendConnected] = useState(false);

  // Update userInfo when Firebase user changes
  useEffect(() => {
    const checkIfUserInFirestore = async (uid: string) => {
      const db = getFirestore(); // If no parameter, default Firebase App is used

      const docRef = doc(db, 'users', uid);
      const dataSnap = await getDoc(docRef);

      if (dataSnap.exists()) {
        const data = dataSnap.data() as FirestoreUser;
        return data;
      } else {
        return null;
      }
    };

    const createNewUserInFirestore = async (loggedInUser: AuthUser) => {
      try {
        const db = getFirestore();
        const docRef = doc(db, 'users', loggedInUser.uid);

        const displayName = loggedInUser?.displayName?.split(' ');
        const firstName = displayName?.shift() || '';
        const lastName = displayName?.pop() || '';

        const newUser: FirestoreUser = {
          firstName,
          lastName,
          email: loggedInUser.email,
          phone: '',
          fullAddress: {
            address: '',
            number: '',
            area: '',
            city: '',
            postalCode: '',
            lat: 0,
            lng: 0,
            confirmed: false,
          },
        };

        await setDoc(docRef, newUser);

        return newUser;
      } catch (error) {
        return null;
      }
    };

    const updateUserInfo = async () => {
      if (isNormalAccount) {
        // Check if user is in firestore
        const userInFirestore = await checkIfUserInFirestore(user.uid);

        if (userInFirestore) {
          userInfoDispatch({ type: 'SET_FIRST_NAME', payload: userInFirestore.firstName || '' });
          userInfoDispatch({ type: 'SET_LAST_NAME', payload: userInFirestore.lastName || '' });
          userInfoDispatch({ type: 'SET_EMAIL', payload: userInFirestore.email || '' });
          userInfoDispatch({ type: 'SET_PHONE', payload: userInFirestore.phone || '' });
          if (userInFirestore?.fullAddress?.confirmed) {
            userInfoDispatch({ type: 'SET_ADDRESS', payload: userInFirestore.fullAddress });
          }
        } else {
          // TODO: Create user in firestore
          const newUser = await createNewUserInFirestore(user);
          if (newUser) {
            userInfoDispatch({ type: 'SET_FIRST_NAME', payload: newUser.firstName });
            userInfoDispatch({ type: 'SET_LAST_NAME', payload: newUser.lastName });
            userInfoDispatch({ type: 'SET_EMAIL', payload: newUser.email });
          }
        }
      }
    };

    updateUserInfo();
  }, [user, isNormalAccount]);

  // Fetch the stores and categories on startup
  useEffect(() => {
    let timeoutID: NodeJS.Timeout;

    const checkBackendStatus = async () => {
      try {
        const response = await fetch(`${baseURL}/api/status`);
        const data = await response.json();
        setIsBackendConnected(data.status);

        // ping the backend every 10 minutes
        timeoutID = setTimeout(() => {
          checkBackendStatus();
        }, 600000); //10 minutes
      } catch {
        checkBackendStatus();
      }
    };

    checkBackendStatus();

    return () => {
      clearTimeout(timeoutID);
    };
  }, []);

  useEffect(() => {
    const getStores = async () => {
      const response = await fetch(`${baseURL}/api/stores`);
      const data: Store[] = await response.json();
      setStores(data);
    };

    const getCategories = async () => {
      const response = await fetch(`${baseURL}/api/categories`);
      const data = await response.json();
      const categoriesArray = data.categories;
      categoriesArray.forEach((category: Category) => (category.selected = false));
      setCategories(categoriesArray);
    };

    if (isBackendConnected) {
      getStores();
      getCategories();
    }
  }, [isBackendConnected]);

  // Check if the delivery is initialized
  useEffect(() => {
    if (stores.length > 0 && categories.length > 0) {
      setIsDeliveryInitialized(true);
    } else {
      setIsDeliveryInitialized(false);
    }
  }, [stores, categories]);

  // Check if user Info is valid
  useEffect(() => {
    // check if phone is valid
    if (userInfoState.phone.length > 0) {
      const phoneRegex = new RegExp(/^[0-9]{10}$/);
      const isPhoneValid = phoneRegex.test(userInfoState.phone);
      if (isPhoneValid && userInfoState.phone.length === 10) {
        userInfoDispatch({ type: 'SET_IS_PHONE_VALID', payload: isPhoneValid });
      } else {
        userInfoDispatch({ type: 'SET_IS_PHONE_VALID', payload: false });
      }
    }
    // check if email is valid
    if (userInfoState.email.length > 0) {
      const emailRegex = new RegExp(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/);
      const isEmailValid = emailRegex.test(userInfoState.email);
      if (isEmailValid) {
        userInfoDispatch({ type: 'SET_IS_EMAIL_VALID', payload: isEmailValid });
      } else {
        userInfoDispatch({ type: 'SET_IS_EMAIL_VALID', payload: false });
      }
    }
  }, [userInfoState.phone, userInfoState.email]);

  // Update the user info in the local storage when it changes
  useEffect(() => {
    if (isNormalAccount) return;

    userStorage.setValue(
      JSON.stringify({
        firstName: userInfoState.firstName,
        lastName: userInfoState.lastName,
        phone: userInfoState.phone,
        email: userInfoState.email,
      }),
    );
  }, [userInfoState.firstName, userInfoState.lastName, userInfoState.phone, userInfoState.email]);

  // Update the address in the local storage when it changes
  useEffect(() => {
    if (isNormalAccount) return;

    addressStorage.setValue(JSON.stringify(userInfoState.fullAddress));
  }, [userInfoState.fullAddress]);

  // Check if the order is ready to submit
  useEffect(() => {
    if (
      basketState.store?._id &&
      basketState.totalItems.length > 0 &&
      userInfoState.fullAddress.confirmed &&
      userInfoState.firstName &&
      userInfoState.lastName &&
      userInfoState.phone &&
      userInfoState.email &&
      userInfoState.payment &&
      userInfoState.isPhoneValid &&
      userInfoState.isEmailValid
    ) {
      setReadyToSubmit(true);
    } else {
      setReadyToSubmit(false);
    }
  }, [userInfoState, basketState]);

  const providerValues = useMemo(
    () => ({
      isLoading,
      setIsLoading,
      userInfoState,
      userInfoDispatch,
      stores,
      categories,
      setCategories,
      showOptions,
      setShowOptions,
      activeMenuItem,
      setActiveMenuItem,
      activeStore,
      setActiveStore,
      basketState,
      basketDispatch,
      replaceMenuItem,
      setReplaceMenuItem,
      showBasket,
      setShowBasket,
      readyToSubmit,
    }),
    [
      isLoading,
      userInfoState,
      userInfoDispatch,
      stores,
      categories,
      showOptions,
      activeMenuItem,
      activeStore,
      basketState,
      replaceMenuItem,
      showBasket,
      readyToSubmit,
    ],
  );

  return (
    <DeliveryContext.Provider value={providerValues}>
      {!isBackendConnected ? (
        <Loader text="Waiting for the backend server..." variant="server" />
      ) : isDeliveryInitialized ? (
        <>
          {isLoading && <Loader />}
          <AnimatePresence>
            {showOptions && <MenuItemOptions item={activeMenuItem} replaceItem={replaceMenuItem} />}
          </AnimatePresence>
          {children}
        </>
      ) : (
        <Loader text="Loading stores..." />
      )}
    </DeliveryContext.Provider>
  );
}

export default DeliveryProvider;
