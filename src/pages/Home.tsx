import { useState } from 'react';
import Categories from '../components/home/Categories';
import Navbar from '../components/layout/Navbar';
import { motion } from 'framer-motion';
import Stores from '../components/home/Stores';

type Category = {
  id: number;
  name: string;
  selected: boolean;
};

function Home() {
  const [categories, setCategories] = useState<Category[]>(categoriesArray);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      exit={{ opacity: 0 }}
      className="w-full min-h-screen flex flex-col justify-start items-center overflow-hidden"
    >
      <Categories categories={categories} setCategories={setCategories} />
      <Stores />
    </motion.div>
  );
}
export default Home;

const categoriesArray = [
  {
    id: 1,
    name: 'Καφέδες',
    selected: false,
  },
  {
    id: 2,
    name: 'Σουβλάκια',
    selected: false,
  },
  {
    id: 3,
    name: 'Πίτσες',
    selected: false,
  },
  {
    id: 4,
    name: 'Κρέπες',
    selected: false,
  },
  {
    id: 5,
    name: 'Burgers',
    selected: false,
  },
  {
    id: 6,
    name: 'Ψητά',
    selected: false,
  },
  {
    id: 7,
    name: 'Ιταλική',
    selected: false,
  },
];
