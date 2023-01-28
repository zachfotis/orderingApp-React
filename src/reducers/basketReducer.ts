import { BasketItem, BasketSelectedItem, Store } from '../types';

export interface BasketStateProps {
  store: Store | null;
  totalItems: BasketSelectedItem[] | [];
}

export type BasketActionProps =
  | {
      type: 'ADD_ITEM' | 'INCREASE_QUANTITY' | 'DECREASE_QUANTITY' | 'REMOVE_ITEM' | 'REPLACE_ITEM';
      payload: BasketItem;
    }
  | {
      type: 'CLEAR_BASKET';
    };

export const basketReducer = (state: BasketStateProps, action: BasketActionProps) => {
  switch (action.type) {
    case 'ADD_ITEM':
      // Check if the store is the same as the one in the basket
      if (state?.store === action.payload.store) {
        // Check if the item is already in the basket
        const itemInBasket = checkIfItemIsInBasket(state.totalItems, action.payload);
        if (itemInBasket) {
          // If the item is already in the basket, update the quantity
          const updatedItems = state.totalItems.map((item) => {
            if (checkIfItemsAreTheSame(item, action.payload.selectedItem)) {
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
    case 'INCREASE_QUANTITY': {
      const updatedItems = state.totalItems.map((item) => {
        if (item.id === action.payload.selectedItem.id) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
      return {
        ...state,
        totalItems: updatedItems,
      };
    }
    case 'DECREASE_QUANTITY': {
      const updatedItems = state.totalItems.map((item) => {
        if (item.id === action.payload.selectedItem.id) {
          if (item.quantity === 1) return item;

          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      });
      return {
        ...state,
        totalItems: updatedItems,
      };
    }
    case 'REMOVE_ITEM': {
      const updatedItems = state.totalItems.filter((item) => {
        return item.id !== action.payload.selectedItem.id;
      });
      return {
        ...state,
        totalItems: updatedItems,
      };
    }
    case 'REPLACE_ITEM': {
      const updatedItems = state.totalItems.map((item) => {
        if (item.id === action.payload.selectedItem.id) {
          return action.payload.selectedItem;
        }
        return item;
      });
      return {
        ...state,
        totalItems: updatedItems,
      };
    }
    case 'CLEAR_BASKET':
      return {
        store: null,
        totalItems: [],
      };
    default:
      return state;
  }
};

// ------------------------------ Helper functions ------------------------------ //

const checkIfItemIsInBasket = (totalItems: BasketSelectedItem[], payload: BasketItem) => {
  const inBasketItem = totalItems.find((item) => {
    return checkIfItemsAreTheSame(item, payload.selectedItem);
  });

  if (inBasketItem) {
    return true;
  } else {
    return false;
  }
};

const checkIfItemsAreTheSame = (item1: BasketSelectedItem, item2: BasketSelectedItem) => {
  return (
    // Check all the options to see if they are the same
    item1.itemName === item2.itemName &&
    Object.keys(item1.options).every((optionKey) => {
      return Object.keys(item1.options[optionKey]).every((optionValue) => {
        return item1.options[optionKey][optionValue] === item2.options[optionKey][optionValue];
      });
    })
  );
};
