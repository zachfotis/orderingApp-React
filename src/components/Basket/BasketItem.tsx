import { useState } from 'react';
import { useDeliveryContext } from '../../context/DeliveryContext';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { HiMinusSm, HiPlusSm } from 'react-icons/hi';
import { AiFillDelete } from 'react-icons/ai';
import { BasketSelectedItem, MenuItem, Store } from '../../types';
import { baseURL } from '../../utilities/server';

interface BasketItemProps {
  item: BasketSelectedItem;
  store: Store | null;
}

function BasketItem({ item, store }: BasketItemProps) {
  const { basketDispatch, setActiveMenuItem, setShowOptions, setReplaceMenuItem } = useDeliveryContext();
  const [showEdit, setShowEdit] = useState(false);

  const openMenuItemOptions = async (item: BasketSelectedItem) => {
    const response = await fetch(`${baseURL}api/catalog/${store?._id}`);
    const data = await response.json();
    const catalog = data.categories;

    Object.keys(catalog).forEach((key) => {
      catalog[key].forEach((i: MenuItem) => {
        if (i.name === item.itemName) {
          setReplaceMenuItem(item);
          setShowOptions(true);
          setActiveMenuItem(i);
        }
      });
    });
  };

  const increaseQuantity = () => {
    if (store) {
      basketDispatch({
        type: 'INCREASE_QUANTITY',
        payload: {
          store: store,
          selectedItem: item,
        },
      });
    }
  };

  const decreaseQuantity = () => {
    if (store) {
      basketDispatch({
        type: 'DECREASE_QUANTITY',
        payload: {
          store: store,
          selectedItem: item,
        },
      });
    }
  };

  const removeItem = () => {
    if (store) {
      basketDispatch({
        type: 'REMOVE_ITEM',
        payload: {
          store: store,
          selectedItem: item,
        },
      });
    }
  };

  return (
    <div className="w-full flex flex-col justify-center items-start gap-5 p-3 shadow-sm rounded-lg bg-white">
      {/* Item */}
      <div className="w-full flex justify-between items-center gap-3">
        <button className="flex items-center gap-1" onClick={() => setShowEdit(!showEdit)}>
          <p className="text-sm text-greyDark font-[500]">{item.quantity}</p>
          <MdOutlineKeyboardArrowDown className="text-sm text-greyDark" />
        </button>
        <button
          className="w-full text-sm text-greyDark font-[400] text-start"
          onClick={() => {
            openMenuItemOptions(item);
          }}
        >
          {item.itemName}
        </button>
        <p className="text-sm text-greyDark font-[400]">{(item.itemPrice * item.quantity).toFixed(2)}€</p>
      </div>
      {/* Popup */}
      {showEdit && (
        <div className="w-full flex justify-start items-center gap-5 border-t border-t-1 border-t-gray-200 pt-4">
          <div className="flex justify-start items-center gap-3">
            <button className="bg-gray-100 p-2 rounded-lg hover:bg-gray-300" onClick={decreaseQuantity}>
              <HiMinusSm className="text-black" />
            </button>
            <p>{item.quantity}</p>
            <button className="bg-gray-100 p-2 rounded-lg hover:bg-gray-300" onClick={increaseQuantity}>
              <HiPlusSm className="text-black" />
            </button>
          </div>
          <button className="w-full flex justify-between items-center gap-3" onClick={removeItem}>
            <AiFillDelete className="text-red-400 text-2xl cursor-pointer hover:scale-110" />
          </button>
        </div>
      )}
    </div>
  );
}
export default BasketItem;
