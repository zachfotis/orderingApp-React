import { motion } from 'framer-motion';
import Categories from '../components/home/Categories';
import Stores from '../components/home/Stores';

import { useEffect, useState } from 'react';
import { useDeliveryContext } from '../context/DeliveryContext';
import { baseURL } from '../utilities/server';

function Home() {
  const { categories, setCategories } = useDeliveryContext();
  const [dealsCatalog, setDealsCatalog] = useState([]);

  // This code is used to get the deals catalog from the backend
  // The response is then stored in the dealsCatalog state variable
  // The useEffect hook is used to make sure the code is run only once

  useEffect(() => {
    const getDealsCatalog = async () => {
      const response = await fetch(`${baseURL}/api/dealStores`);
      const data = await response.json();
      setDealsCatalog(data);
    };

    getDealsCatalog();
  }, []);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      exit={{ opacity: 0 }}
      className="w-full flex flex-col justify-start items-center overflow-hidden"
    >
      <Categories categories={categories} setCategories={setCategories} />
      <Stores categories={categories} dealsCatalog={dealsCatalog} />
    </motion.div>
  );
}
export default Home;
