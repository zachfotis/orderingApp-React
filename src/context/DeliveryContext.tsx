import { AnimatePresence } from 'framer-motion';
import { createContext, useContext, useEffect, useMemo, useReducer, useState } from 'react';
import Loader from '../components/Loader';
import MenuItemOptions from '../components/store/MenuItemOptions';
import useLocalStorage from '../hooks/useLocalStorage';
import { BasketActionProps, basketReducer, BasketStateProps } from '../reducers/basketReducer';
import { ReducerActionProps, ReducerStateProps, userReducer } from '../reducers/userReducer';

import { BasketSelectedItem, Category, MenuItem, Store } from '../types';
import { baseURL } from '../utilities/server';

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

  const { storedValue } = useLocalStorage('address', '');

  // State for the user info
  const [userInfoState, userInfoDispatch] = useReducer(userReducer, {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    payment: 'cash',
    isPhoneValid: false,
    isEmailValid: false,
    fullAddress: storedValue
      ? JSON.parse(storedValue)
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
