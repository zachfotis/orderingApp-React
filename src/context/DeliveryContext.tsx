import { createContext, useContext, useReducer, useState } from 'react';
import Loader from '../components/Loader';

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
  address: string;
  coords_lat: string;
  coords_lng: string;
}

interface ReducerActionProps {
  type:
    | 'SET_FIRST_NAME'
    | 'SET_LAST_NAME'
    | 'SET_EMAIL'
    | 'SET_PHONE'
    | 'SET_ADDRESS'
    | 'SET_COORDS_LAT'
    | 'SET_COORDS_LNG';
  payload: string;
}

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
      return { ...state, address: action.payload };
    case 'SET_COORDS_LAT':
      return { ...state, coords_lat: action.payload };
    case 'SET_COORDS_LNG':
      return { ...state, coords_lng: action.payload };
    default:
      return state;
  }
};

function DeliveryProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);
  const [userInfoState, userInfoDispatch] = useReducer(reducer, {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    coords_lat: '',
    coords_lng: '',
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
