import { createContext, useContext, useReducer, useState } from 'react';
import Loader from '../components/Loader';
import useLocalStorage from '../hooks/useLocalStorage';

// ==================== TYPES ====================
interface DeliveryContextProps {
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
  userInfoState: ReducerStateProps;
  userInfoDispatch: (value: ReducerActionProps) => void;
}

interface ReducerStateProps {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  fullAddress: {
    address: string;
    number: string;
    area: string;
    city: string;
    postalCode: string;
    lat: number;
    lng: number;
    confirmed: boolean;
  };
}

type ReducerActionProps =
  | { type: 'SET_FIRST_NAME'; payload: string }
  | { type: 'SET_LAST_NAME'; payload: string }
  | { type: 'SET_EMAIL'; payload: string }
  | { type: 'SET_PHONE'; payload: string }
  | {
      type: 'SET_ADDRESS';
      payload: {
        address: string;
        number: string;
        area: string;
        city: string;
        postalCode: string;
        lat: number;
        lng: number;
        confirmed: boolean;
      };
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

  return (
    <DeliveryContext.Provider
      value={{
        isLoading,
        setIsLoading,
        userInfoState,
        userInfoDispatch,
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
