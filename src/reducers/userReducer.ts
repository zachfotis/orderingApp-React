import { Address } from '../types';

export interface ReducerStateProps {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  payment: string;
  isPhoneValid: boolean;
  isEmailValid: boolean;
  fullAddress: Address;
}

export type ReducerActionProps =
  | { type: 'SET_FIRST_NAME'; payload: string }
  | { type: 'SET_LAST_NAME'; payload: string }
  | { type: 'SET_EMAIL'; payload: string }
  | { type: 'SET_PHONE'; payload: string }
  | {
      type: 'SET_ADDRESS';
      payload: Address;
    }
  | { type: 'SET_ADDRESS_CONFIRMED'; payload: boolean }
  | { type: 'DELETE_ADDRESS' }
  | { type: 'SET_PAYMENT'; payload: string }
  | { type: 'SET_IS_PHONE_VALID'; payload: boolean }
  | { type: 'SET_IS_EMAIL_VALID'; payload: boolean };

export const userReducer = (state: ReducerStateProps, action: ReducerActionProps) => {
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
    case 'SET_PAYMENT':
      return { ...state, payment: action.payload };
    case 'SET_IS_PHONE_VALID':
      return { ...state, isPhoneValid: action.payload };
    case 'SET_IS_EMAIL_VALID':
      return { ...state, isEmailValid: action.payload };
    default:
      return state;
  }
};
