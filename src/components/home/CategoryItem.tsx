import { motion } from 'framer-motion';
import { baseURL } from '../../utilities/server';
import { Category } from '../../types';

interface CategoryItemProps {
  category: Category;
  setCategories: (value: Category[] | ((prev: Category[]) => Category[])) => void;
}

function CategoryItem({ category, setCategories }: CategoryItemProps) {
  const setSelected = (selected: boolean) => {
    setCategories((prev) => {
      const newCategories = prev.map((cat) => {
        if (cat.name === category.name) {
          cat.selected = selected;
        }
        return cat;
      });
      return newCategories;
    });
  };
  return (
    <motion.div
      className={`snap-center flex flex-col justify-center items-center gap-1 p-1 rounded-lg ${
        category.selected && 'shadow-lg outline-greyLight outline-2 outline-dashed'
      }`}
      onClick={() => setSelected(!category.selected)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => (e.key === ' ' || e.key === 'Enter' ? setSelected(!category.selected) : null)}
      whileHover={{ scale: 1.05 }}
    >
      <div className="w-[70px] h-[70px] rounded-lg flex justify-center items-center px-3">
        <img src={baseURL + category.icon} alt={category.name} className="w-full object-cover rounded-lg" />
      </div>
      <h1 className="text-sm text-greyLight text-center">{category.name}</h1>
    </motion.div>
  );
}
export default CategoryItem;
