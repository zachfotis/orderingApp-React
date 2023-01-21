import { useState, useEffect } from 'react';
import { useDeliveryContext } from '../../context/DeliveryContext';
import RibbonIcon from '../../assets/icons/ribbon.png';
import CartIcon from '../../assets/icons/empty-cart.png';
import { BsFillBasket2Fill } from 'react-icons/bs';

import BasketItem from './BasketItem';
import MinimumOrder from './MinimumOrder';
import { BasketSelectedItem } from '../../types';
import { AnimatePresence, motion } from 'framer-motion';

function Basket() {
  const { basketState, activeStore, showBasket, setShowBasket } = useDeliveryContext();
  const [basketQuantity, setBasketQuantity] = useState(0);
  const [basketTotal, setBasketTotal] = useState(0);

  const toggleBasket = () => setShowBasket(!showBasket);

  useEffect(() => {
    setBasketQuantity((basketState.totalItems as BasketSelectedItem[]).reduce((acc, item) => acc + item.quantity, 0));
    setBasketTotal(
      (basketState.totalItems as BasketSelectedItem[]).reduce((acc, item) => acc + item.itemPrice * item.quantity, 0),
    );
  }, [basketState]);

  return (
    <div
      className={`flex bg-slate-50 shadow-lg z-10 transition-all duration-1000 ease-in-out
      fixed top-0 pt-[64px] md:pt-0 md:top-[80px] right-0 w-full md:w-[400px] h-screen md:h-[calc(100vh-80px)] border-l border-l-1 border-l-slate-200
      ${showBasket ? 'translate-x-0' : 'translate-x-[99%] md:translate-x-[95%]'}
    `}
    >
      <button
        onClick={toggleBasket}
        className={`absolute top-[50%] left-0
        transform transition-all duration-200 ease-in-out
        md:-translate-y-1/2 md:-translate-x-1/2 md:hover:-translate-x-[60%] 
        ${showBasket ? 'translate-x-[-25%]' : '-translate-x-1/2'}
        
        `}
      >
        <img src={RibbonIcon} alt="ribbon" className="w-[60px] h-[70px] left-0" />
        <img
          src={CartIcon}
          alt="Cart"
          className="absolute top-[50%] left-[50%] transform -translate-y-1/2 -translate-x-1/2
         w-[25px] h-[25px] cursor-pointer"
        />
      </button>
      {activeStore &&
      basketState?.totalItems.length > 0 &&
      basketState?.store &&
      basketState.store._id === activeStore?._id ? (
        <div className="flex-1 flex flex-col justify-between items-center gap-7 p-5">
          {/* Top Part */}
          <div className="w-full flex flex-col justify-start items-start gap-2">
            <h1 className="text-2xl font-[500]">Καλάθι</h1>
            <div className="flex justify-start items-center gap-2">
              <BsFillBasket2Fill className="text-sm text-gray-500" />
              <p className="text-xs font-[400]">
                Delivery από
                <span className="font-[500]"> {basketState.store.title}</span>
              </p>
            </div>
          </div>
          {/* Basket Items */}
          <div className="flex-1 w-full h-full overflow-y-auto">
            {basketState?.totalItems.length > 0 && (
              <div className="flex flex-col justify-start items-start gap-3">
                {basketState.totalItems.map((item, index) => (
                  <BasketItem key={item.itemName + index} item={item} store={basketState.store} />
                ))}
              </div>
            )}
          </div>
          {/* Bottom Part */}
          <AnimatePresence>
            {basketTotal >= basketState.store.info.minimumOrder ? (
              <motion.button
                className="w-full bg-yellow text-black py-3 px-5 rounded-lg font-[500] text-base hover:bg-yellowHover disabled:bg-greyLight flex justify-between items-center"
                initial={{ opacity: 0, y: '100%' }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: '100%' }}
                transition={{ duration: 0.3 }}
              >
                <p className="px-2 py-1 rounded-lg bg-slate-50">{basketQuantity}</p>
                <p>Συνέχεια</p>
                <p>{basketTotal.toFixed(2)}€</p>
              </motion.button>
            ) : (
              <MinimumOrder minimumPrice={basketState.store.info.minimumOrder} currentPrice={basketTotal} />
            )}
          </AnimatePresence>
        </div>
      ) : (
        <div className="flex-1 flex flex-col justify-center items-center gap-7 p-5">
          <div className="bg-gray-100 p-7 rounded-full">
            <BsFillBasket2Fill className="text-6xl text-gray-500" />
          </div>
          <div className="flex flex-col justify-center items-center gap-3">
            <h1 className="text-2xl font-[600]">Άδειο Καλάθι</h1>
            <p className="text-center text-xs">Προσθέστε προϊόντα στο καλάθι για να ολοκληρώσετε την παραγγελία σας.</p>
          </div>
        </div>
      )}
    </div>
  );
}
export default Basket;
