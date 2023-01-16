import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDeliveryContext } from '../context/DeliveryContext';
import { motion } from 'framer-motion';
import Header from '../components/Store/Header';
import Categories from '../components/Store/Categories';
import { baseURL } from '../utilities/server';
import Menu from '../components/Store/Menu';

function Store() {
  const { id } = useParams<{ id: string }>();
  const { stores } = useDeliveryContext();
  const [catalog, setCatalog] = useState([]);

  useEffect(() => {
    const getCatalog = async () => {
      const response = await fetch(`${baseURL}api/catalog/${id}`);
      const data = await response.json();
      setCatalog(data.categories);
    };

    getCatalog();
  }, []);

  const store = stores.find((store) => store._id === id);
  if (!store) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      exit={{ opacity: 0 }}
      className="w-full max-w-[1000px] mx-auto flex flex-col justify-start items-start overflow-hidden"
    >
      <Header
        store={store}
        isDeal={
          // has key
          Object.hasOwnProperty.call(catalog, 'Specials')
        }
      />
      <Categories catalog={catalog} />
      <Menu catalog={catalog} />
    </motion.div>
  );
}
export default Store;
