import Categories from '../components/home/Categories';
import { motion } from 'framer-motion';
import Stores from '../components/home/Stores';

import { useDeliveryContext } from '../context/DeliveryContext';
import { useEffect, useState } from 'react';
import { baseURL } from '../utilities/server';

function Home() {
  const { categories, setCategories } = useDeliveryContext();
  const [dealsCatalog, setDealsCatalog] = useState([]);

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
