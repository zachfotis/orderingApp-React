import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Categories from '../components/store/Categories';
import Header from '../components/store/Header';
import Menu from '../components/store/Menu';
import { useDeliveryContext } from '../context/DeliveryContext';
import { baseURL } from '../utilities/server';

import Basket from '../components/basket/Basket';
import { Catalog } from '../types';

function Store() {
  const { id } = useParams<{ id: string }>();
  const { stores, setActiveStore, showBasket, setShowBasket } = useDeliveryContext();
  const [catalog, setCatalog] = useState<Catalog>({});
  const location = useLocation();

  useEffect(() => {
    const getCatalog = async () => {
      const response = await fetch(`${baseURL}/api/catalog/${id}`);
      const data = await response.json();
      setCatalog(data.categories);
    };

    getCatalog();
    if (location.state && location.state?.isCartOpen) {
      setShowBasket(true);
    } else {
      setShowBasket(false);
    }
  }, []);

  useEffect(() => {
    const store = stores?.find((store) => store._id === id);
    if (store) {
      setActiveStore(store);
    }
  }, [stores]);

  const store = stores?.find((store) => store._id === id);
  if (!store) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      exit={{ opacity: 0 }}
      className="relative w-full flex justify-start items-start gap-10"
    >
      <div
        className={`w-full max-w-[800px] xl:max-w-[950px] mx-auto flex flex-col justify-start items-start mt-2 md:mt-5
      ${showBasket ? 'xl:-translate-x-[150px]' : 'translate-x-0'}
      transition-all duration-1000 ease-in-out
      `}
      >
        <Header store={store} isDeal={Object.hasOwnProperty.call(catalog, 'Specials')} />
        <Categories catalog={catalog} />
        <Menu catalog={catalog} />
      </div>
      <Basket />
    </motion.div>
  );
}
export default Store;
