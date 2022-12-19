import CoffeeIcon from '../../assets/icons/categories/coffee.avif';
import SouvlakiIcon from '../../assets/icons/categories/souvlakia.avif';
import PizzaIcon from '../../assets/icons/categories/pizza.avif';
import CrepaIcon from '../../assets/icons/categories/crepa.avif';
import BurgerIcon from '../../assets/icons/categories/burger.avif';
import GrillIcon from '../../assets/icons/categories/grill.avif';
import ItalianIcon from '../../assets/icons/categories/pasta.avif';
import { motion } from 'framer-motion';

type Category = {
  id: number;
  name: string;
  selected: boolean;
};

interface CategoryItemProps {
  category: Category;
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
}

function CategoryItem({ category, setCategories }: CategoryItemProps) {
  const getCategoryIcon = (categoryName: string) => {
    switch (categoryName) {
      case 'Καφέδες':
        return CoffeeIcon;
      case 'Σουβλάκια':
        return SouvlakiIcon;
      case 'Πίτσες':
        return PizzaIcon;
      case 'Κρέπες':
        return CrepaIcon;
      case 'Burgers':
        return BurgerIcon;
      case 'Ψητά':
        return GrillIcon;
      case 'Ιταλική':
        return ItalianIcon;
      default:
        return CoffeeIcon;
    }
  };

  const setSelected = (selected: boolean) => {
    setCategories((prev) => prev.map((c) => (c.id === category.id ? { ...c, selected } : c)));
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
      <div className="w-[70px] h-[70px] rounded-lg flex justify-center items-center">
        <img src={getCategoryIcon(category.name)} alt={category.name} className="w-full object-cover rounded-lg" />
      </div>
      <h1 className="text-sm text-greyLight text-center">{category.name}</h1>
    </motion.div>
  );
}
export default CategoryItem;
