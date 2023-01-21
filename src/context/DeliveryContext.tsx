import { AnimatePresence } from 'framer-motion';
import { createContext, useContext, useEffect, useMemo, useReducer, useState } from 'react';
import Loader from '../components/Loader';
import MenuItemOptions from '../components/store/MenuItemOptions';
import useLocalStorage from '../hooks/useLocalStorage';
import { BasketActionProps, basketReducer, BasketStateProps } from '../reducers/basketReducer';
import { ReducerActionProps, ReducerStateProps, userReducer } from '../reducers/userReducer';

import { Store, Category, MenuItem, BasketSelectedItem } from '../types';
import { baseURL } from '../utilities/server';

interface DeliveryContextProps {
  isDeliveryInitialized: boolean;
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

    getStores();
    getCategories();
  }, []);

  // Check if the delivery is initialized
  useEffect(() => {
    if (stores.length > 0 && categories.length > 0 && userInfoState.fullAddress.confirmed) {
      setIsDeliveryInitialized(true);
    } else {
      setIsDeliveryInitialized(false);
    }
  }, [stores, categories, userInfoState.fullAddress.confirmed]);

  const providerValues = useMemo(
    () => ({
      isDeliveryInitialized,
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
    ],
  );

  return (
    <DeliveryContext.Provider value={providerValues}>
      <>
        {isLoading && <Loader />}
        <AnimatePresence>
          {showOptions && <MenuItemOptions item={activeMenuItem} replaceItem={replaceMenuItem} />}
        </AnimatePresence>
        {children}
      </>
    </DeliveryContext.Provider>
  );
}

export default DeliveryProvider;
