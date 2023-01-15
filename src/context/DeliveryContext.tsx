import { createContext, useContext, useEffect, useReducer, useState } from 'react';
import Loader from '../components/Loader';
import useLocalStorage from '../hooks/useLocalStorage';

import { Store, Address, Category } from '../types';
// ==================== TYPES ====================
interface DeliveryContextProps {
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
  userInfoState: ReducerStateProps;
  userInfoDispatch: (value: ReducerActionProps) => void;
  stores: Store[];
  categories: Category[];
  setCategories: (value: Category[] | ((prev: Category[]) => Category[])) => void;
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

// ==================== DeliveryContext ====================
const DeliveryContext = createContext({} as DeliveryContextProps);

const useDeliveryContext = () => {
  return useContext(DeliveryContext);
};

export { useDeliveryContext };

// ==================== DeliveryProvider ====================
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

function DeliveryProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);
  const { storedValue } = useLocalStorage('address', '');

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

  const [stores, setStores] = useState<Store[]>([]);

  const [categories, setCategories] = useState<Category[]>([]);

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

  return (
    <DeliveryContext.Provider
      value={{
        isLoading,
        setIsLoading,
        userInfoState,
        userInfoDispatch,
        stores,
        categories,
        setCategories,
      }}
    >
      <>
        {isLoading && <Loader />}
        {children}
      </>
    </DeliveryContext.Provider>
  );
}

export default DeliveryProvider;
