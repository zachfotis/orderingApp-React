import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDeliveryContext } from '../context/DeliveryContext';
import { motion } from 'framer-motion';
import Header from '../components/Store/Header';
import Categories from '../components/Store/Categories';
import { baseURL } from '../utilities/server';
import Menu from '../components/Store/Menu';

import { Catalog } from '../types';
import Basket from '../components/Basket/Basket';

function Store() {
  const { id } = useParams<{ id: string }>();
  const { stores, setActiveStore, showBasket, setShowBasket } = useDeliveryContext();
  const [catalog, setCatalog] = useState<Catalog>({});

  useEffect(() => {
    const getCatalog = async () => {
      const response = await fetch(`${baseURL}/api/catalog/${id}`);
      const data = await response.json();
      setCatalog(data.categories);
    };

    getCatalog();
    setShowBasket(false);
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
