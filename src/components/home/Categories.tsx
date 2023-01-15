import CategoryItem from './CategoryItem';
import { motion } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';

import { Category } from '../../types';

interface CategoriesProps {
  categories: Category[];
  setCategories: (value: Category[] | ((prevVar: Category[]) => Category[])) => void;
}

function Categories({ categories, setCategories }: CategoriesProps) {
  return (
    <div className="w-full max-w-[1280px] flex flex-col md:py-5 justify-start items-start">
      <h1 className="ml-5 hidden md:block">
        <Typewriter
          words={['', 'Τί θα φάμε σήμερα;', 'Ή μήπως να πιούμε κάτι;', 'Επέλεξε τον τύπο φαγητού που σου αρέσει:']}
          delaySpeed={2000}
          typeSpeed={100}
        />
        &nbsp;
      </h1>
      <motion.div
        initial={{ opacity: 0, x: '100%' }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.5, type: 'spring', stiffness: 100 }}
        className="w-full overflow-y-auto p-5 snap-x flex justify-start items-center gap-5 md:gap-7"
      >
        {categories.map((category) => (
          <CategoryItem key={category.name} category={category} setCategories={setCategories} />
        ))}
      </motion.div>
    </div>
  );
}
export default Categories;
