import { useState, useEffect } from 'react';
import { useDeliveryContext } from '../../context/DeliveryContext';
import { BasketSelectedItem, MenuItem, MenuItemsSelected } from '../../types';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { HiMinusSm, HiPlusSm } from 'react-icons/hi';
import { motion } from 'framer-motion';
import { v4 as uuidv4 } from 'uuid';

interface MenuItemOptionsProps {
  item: MenuItem | null;
  replaceItem: BasketSelectedItem | null;
}

type RequiredOptions = {
  [key: string]: { required: boolean; given: boolean };
};

// ---------------------- HELPER FUNCTIONS ----------------------

const initializeMenuItemsSelected = (item: MenuItem | null) => {
  if (!item) return null;

  const obj: MenuItemsSelected = {};
  if (item?.options) {
    Object.keys(item.options).forEach((optionTitle) => {
      if (!item?.options) return;
      const optionsObj = item.options[optionTitle];
      Object.keys(optionsObj).forEach((option) => {
        obj[optionTitle] = {
          ...obj[optionTitle],
          [option]: false,
        };
      });
    });
  }
  return obj;
};

const setSelectedOptionsToFalse = (prev: MenuItemsSelected | null, optionTitle: string) => {
  if (!prev) return null;
  return {
    ...prev,
    [optionTitle]: Object.keys(prev[optionTitle]).reduce((acc, optionItem) => {
      return {
        ...acc,
        [optionItem]: false,
      };
    }, {}),
  };
};

const setSelectedItemToTrue = (prev: MenuItemsSelected | null, optionTitle: string, optionItem: string) => {
  if (!prev) return null;
  return {
    ...prev,
    [optionTitle]: {
      ...prev[optionTitle],
      [optionItem]: true,
    },
  };
};

const setSelectedItemToFalse = (prev: MenuItemsSelected | null, optionTitle: string, optionItem: string) => {
  if (!prev) return null;
  return {
    ...prev,
    [optionTitle]: {
      ...prev[optionTitle],
      [optionItem]: false,
    },
  };
};

// Check if at least one item is selected for each optionTitle
const isAtLeastOneItemSelected = (prev: MenuItemsSelected | null, item: MenuItem | null) => {
  if (!prev || !item) return false;
  return Object.keys(prev).every((optionTitle) => {
    if (item?.isSingleOption?.[optionTitle]) {
      return Object.keys(prev[optionTitle]).some((optionItem) => prev[optionTitle][optionItem]);
    }
    return true;
  });
};

// Create an object with the required options selection for each optionTitle if isSingleOption is true
const getRequiredOptionsSelection = (item: MenuItem | null, menuItemsSelected: MenuItemsSelected | null) => {
  if (!item || !menuItemsSelected) return null;

  const obj: RequiredOptions = {};
  if (item?.options) {
    Object.keys(item.options).forEach((optionTitle) => {
      obj[optionTitle] = {
        required: item?.isSingleOption?.[optionTitle] ? true : false,
        given: isRequiredOptionsSelectionGiven(menuItemsSelected, optionTitle),
      };
    });
  }
  return obj;
};

// check if the required options selection is given for the given optionTitle
const isRequiredOptionsSelectionGiven = (menuItemsSelected: MenuItemsSelected | null, optionTitle: string) => {
  if (!menuItemsSelected) return false;
  return Object.keys(menuItemsSelected[optionTitle]).some((optionItem) => menuItemsSelected[optionTitle][optionItem]);
};

// -------------------------------------------------------------

function MenuItemOptions({ item, replaceItem = null }: MenuItemOptionsProps) {
  const { basketDispatch, activeStore, setShowOptions, setReplaceMenuItem, setActiveMenuItem } = useDeliveryContext();
  const [menuItemPrice, setMenuItemPrice] = useState(Number(item?.price.toFixed(2)) || 0);
  const [menuItemsSelected, setMenuItemsSelected] = useState(initializeMenuItemsSelected(item));
  const [quantity, setQuantity] = useState(1);
  const [requiredOptionsSelection, setRequiredOptionsSelection] = useState<RequiredOptions | null>(null);

  const handleSelectionChange = (e: React.ChangeEvent<HTMLInputElement>, optionTitle: string, optionItem: string) => {
    if (e.target.checked) {
      // Set all options of the given optionTitle to false if isSingleOption is true
      if (item?.isSingleOption?.[optionTitle]) {
        setMenuItemsSelected((prev) => {
          return setSelectedOptionsToFalse(prev, optionTitle);
        });
      }
      // Set the selected option to true
      setMenuItemsSelected((prev) => {
        return setSelectedItemToTrue(prev, optionTitle, optionItem);
      });
    } else {
      // Set the selected option to false
      setMenuItemsSelected((prev) => {
        return setSelectedItemToFalse(prev, optionTitle, optionItem);
      });
    }

    if (requiredOptionsSelection) {
      setRequiredOptionsSelection(null);
    }
  };

  const handleAddToCart = () => {
    // Update requiredOptionsSelection
    setRequiredOptionsSelection(getRequiredOptionsSelection(item, menuItemsSelected));

    if (!menuItemsSelected || !item) return;
    if (!isAtLeastOneItemSelected(menuItemsSelected, item)) return;
    if (activeStore) {
      if (!replaceItem) {
        basketDispatch({
          type: 'ADD_ITEM',
          payload: {
            store: activeStore,
            selectedItem: {
              id: uuidv4(),
              itemName: item.name,
              itemPrice: menuItemPrice,
              quantity,
              options: menuItemsSelected,
            },
          },
        });
      } else {
        basketDispatch({
          type: 'REPLACE_ITEM',
          payload: {
            store: activeStore,
            selectedItem: {
              id: replaceItem.id,
              itemName: item.name,
              itemPrice: menuItemPrice,
              quantity,
              options: menuItemsSelected,
            },
          },
        });
      }
      setReplaceMenuItem(null);
      setShowOptions(false);
      setActiveMenuItem(null);
    }
  };

  const closeWindow = () => {
    setReplaceMenuItem(null);
    setShowOptions(false);
    setActiveMenuItem(null);
  };

  useEffect(() => {
    if (!menuItemsSelected || !item) return;

    // Update Price
    const price = Object.keys(menuItemsSelected).reduce((acc, optionTitle) => {
      Object.keys(menuItemsSelected[optionTitle]).forEach((optionItem) => {
        const optionPrice = item.options?.[optionTitle]?.[optionItem] || 0;
        if (menuItemsSelected[optionTitle][optionItem]) {
          acc += optionPrice;
        }
      });
      return acc;
    }, item.price);
    setMenuItemPrice(Number((price * quantity).toFixed(2)));
  }, [menuItemsSelected, quantity]);

  if (!item) return null;

  return (
    <motion.div
      className="w-screen h-screen fixed top-0 left-0 bg-black bg-opacity-50 z-[100]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 
        w-screen md:w-[50vw] max-w-[700px] h-screen md:h-[80%] flex flex-col justify-start items-start overflow-hidden
        bg-white md:rounded-md shadow-lg z-10"
        initial={{ top: '-100%' }}
        animate={{ top: '50%' }}
        exit={{ top: '-100%' }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative w-full bg-white flex flex-col justify-start items-start gap-1 p-5">
          <h1 className="text-base font-[500]">{item?.name}</h1>
          <p className="text-sm font-[400] text-greyLight">{item?.description}</p>
          <p className="text-xl font-[500] mt-3">{menuItemPrice}€</p>
          <AiOutlineCloseCircle
            className="absolute top-5 right-5 text-3xl text-greyDark cursor-pointer hover:scale-110 transition-all duration-200"
            onClick={closeWindow}
          />
        </div>
        <div className="w-full flex-1 bg-gray-100 p-5 flex flex-col justify-start items-start gap-7 overflow-auto md:scrollbar-hide">
          {item?.options ? (
            Object.keys(item.options).map((optionTitle) => {
              return (
                <div
                  key={'menu-item-options-' + optionTitle}
                  className="w-full flex flex-col justify-start items-start gap-3"
                >
                  <h1
                    className={`text-base font-[500] ${
                      requiredOptionsSelection &&
                      requiredOptionsSelection[optionTitle].required &&
                      !requiredOptionsSelection[optionTitle].given &&
                      'outline-2 outline-dashed outline-red-600 px-2 rounded-sm'
                    }`}
                  >
                    {optionTitle.charAt(0).toUpperCase() + optionTitle.slice(1).replace(/([A-Z])/g, ' $1')}
                    <span className="text-red-600">{item?.isSingleOption?.[optionTitle] && ' *'}</span>
                  </h1>
                  <div className="w-full flex flex-col justify-start items-start gap-3">
                    {item?.options &&
                      Object.keys(item.options[optionTitle]).map((optionItem) => {
                        return (
                          <label
                            key={'menu-item-options-' + optionItem}
                            htmlFor={optionItem}
                            className="w-full flex justify-start items-center gap-3 bg-white p-3 rounded-lg cursor-pointer hover:scale-[1.02] transition-all duration-200"
                          >
                            <input
                              id={optionItem}
                              type={'checkbox'}
                              className="text-sm font-[400] bg-white p-2 rounded-lg"
                              checked={menuItemsSelected?.[optionTitle]?.[optionItem]}
                              onChange={(e) => {
                                handleSelectionChange(e, optionTitle, optionItem);
                              }}
                            />
                            <div className="w-full flex justify-between items-center">
                              <p className="w-full text-sm font-[400]">
                                {optionItem.charAt(0).toUpperCase() + optionItem.slice(1).replace(/([A-Z])/g, ' $1')}
                              </p>
                              <p className="text-base text-greyLight">
                                {item?.options && item?.options[optionTitle][optionItem].toFixed(2)}€
                              </p>
                            </div>
                          </label>
                        );
                      })}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="w-full h-full flex-1 flex justify-center items-center">
              <p className="text-xs">Δεν υπάρχουν επιπρόσθετες επιλογές</p>
            </div>
          )}
        </div>
        <div className="w-full bg-white px-3 py-4 md:p-5 flex justify-between items-center gap-5">
          <div className="flex justify-center items-center gap-3">
            <button
              className="bg-gray-100 p-2 rounded-lg hover:bg-gray-300"
              onClick={() => {
                if (quantity > 1) {
                  setQuantity(quantity - 1);
                }
              }}
            >
              <HiMinusSm className="text-black" />
            </button>
            <p>{quantity}</p>
            <button
              className="bg-gray-100 p-2 rounded-lg hover:bg-gray-300"
              onClick={() => {
                setQuantity(quantity + 1);
              }}
            >
              <HiPlusSm className="text-black" />
            </button>
          </div>
          <button
            className="bg-yellow text-black py-3 px-5 rounded-lg font-[500] text-sm hover:bg-yellowHover disabled:bg-greyLight"
            onClick={handleAddToCart}
          >
            {replaceItem ? 'Διόρθωση' : 'Προσθήκη στο καλάθι'}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
export default MenuItemOptions;
