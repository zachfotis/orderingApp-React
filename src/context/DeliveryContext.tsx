import { createContext, useContext, useEffect, useMemo, useReducer, useState } from 'react';
import Loader from '../components/Loader';
import MenuItemOptions from '../components/Store/MenuItemOptions';
import useLocalStorage from '../hooks/useLocalStorage';

import { Store, Address, Category, MenuItem, BasketItem, BasketSelectedItem } from '../types';
// ==================== TYPES ====================
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
  activeMenuItem: MenuItem | null;
  setActiveMenuItem: (value: MenuItem | null) => void;
  activeStore: Store | null;
  setActiveStore: (value: Store | null) => void;
  basketState: BasketStateProps;
  basketDispatch: (value: BasketActionProps) => void;
}

interface ReducerStateProps {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  fullAddress: Address;
}

type ReducerActionProps =
  | { type: 'SET_FIRST_NAME'; payload: string }
  | { type: 'SET_LAST_NAME'; payload: string }
  | { type: 'SET_EMAIL'; payload: string }
  | { type: 'SET_PHONE'; payload: string }
  | {
      type: 'SET_ADDRESS';
      payload: Address;
    }
  | { type: 'SET_ADDRESS_CONFIRMED'; payload: boolean }
  | { type: 'DELETE_ADDRESS' };

const reducer = (state: ReducerStateProps, action: ReducerActionProps) => {
  switch (action.type) {
    case 'SET_FIRST_NAME':
      return { ...state, firstName: action.payload };
    case 'SET_LAST_NAME':
      return { ...state, lastName: action.payload };
    case 'SET_EMAIL':
      return { ...state, email: action.payload };
    case 'SET_PHONE':
      return { ...state, phone: action.payload };
    case 'SET_ADDRESS':
      return { ...state, fullAddress: action.payload };
    case 'SET_ADDRESS_CONFIRMED':
      return { ...state, fullAddress: { ...state.fullAddress, confirmed: action.payload } };
    case 'DELETE_ADDRESS':
      return {
        ...state,
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
    default:
      return state;
  }
};

interface BasketStateProps {
  store: Store | null;
  totalItems: BasketSelectedItem[] | [];
}

interface BasketActionProps {
  type: 'ADD_ITEM';
  payload: BasketItem;
}

const basketReducer = (state: BasketStateProps, action: BasketActionProps) => {
  switch (action.type) {
    case 'ADD_ITEM':
      // Check if the store is the same as the one in the basket
      if (state?.store === action.payload.store) {
        // Check if the item is already in the basket
        const itemInBasket = state.totalItems.find((item) => {
          return (
            // Check all the options to see if they are the same
            item.itemName === action.payload.selectedItem.itemName &&
            Object.keys(item.options).every((optionKey) => {
              return Object.keys(item.options[optionKey]).every((optionValue) => {
                return (
                  item.options[optionKey][optionValue] === action.payload.selectedItem.options[optionKey][optionValue]
                );
              });
            })
          );
        });
        if (itemInBasket) {
          // If the item is already in the basket, update the quantity
          const updatedItems = state.totalItems.map((item) => {
            if (item.itemName === action.payload.selectedItem.itemName) {
              return { ...item, quantity: item.quantity + action.payload.selectedItem.quantity };
            }
            return item;
          });

          return {
            ...state,
            totalItems: updatedItems,
          };
        } else {
          return {
            ...state,
            totalItems: [...state.totalItems, action.payload.selectedItem],
          };
        }
        // If the store is different, clear the basket and add the new item
      } else {
        return {
          store: action.payload.store,
          totalItems: [action.payload.selectedItem],
        };
      }
    default:
      return state;
  }
};

// ==================== DeliveryContext ====================
const DeliveryContext = createContext({} as DeliveryContextProps);

const useDeliveryContext = () => {
  return useContext(DeliveryContext);
};

export { useDeliveryContext };

// ==================== DeliveryProvider ====================

function DeliveryProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isDeliveryInitialized, setIsDeliveryInitialized] = useState(false);

  const { storedValue } = useLocalStorage('address', '');

  // State for the user info
  const [userInfoState, userInfoDispatch] = useReducer(reducer, {
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

  // State for the options for the selected menu item
  const [showOptions, setShowOptions] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState<MenuItem | null>(null);

  useEffect(() => {
    const getStores = async () => {
      const response = await fetch('http://localhost:3001/api/stores');
      const data: Store[] = await response.json();
      setStores(data);
    };

    const getCategories = async () => {
      const response = await fetch('http://localhost:3001/api/categories');
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
    }),
    [isLoading, userInfoState, userInfoDispatch, stores, categories, showOptions, activeMenuItem],
  );

  return (
    <DeliveryContext.Provider value={providerValues}>
      <>
        {(isLoading || !isDeliveryInitialized) && <Loader />}
        {showOptions && <MenuItemOptions setShowOptions={setShowOptions} item={activeMenuItem} />}
        {children}
      </>
    </DeliveryContext.Provider>
  );
}

export default DeliveryProvider;
