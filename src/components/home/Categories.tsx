import CategoryItem from './CategoryItem';

function Categories() {
  return (
    <div className="w-full overflow-y-auto snap-x p-5 flex justify-start items-center gap-5 md:gap-7">
      {categories.map((category) => (
        <CategoryItem key={category.id} category={category} />
      ))}
    </div>
  );
}
export default Categories;

const categories = [
  {
    id: 1,
    name: 'Καφέδες',
  },
  {
    id: 2,
    name: 'Σουβλάκια',
  },
  {
    id: 3,
    name: 'Πίτσες',
  },
  {
    id: 4,
    name: 'Κρέπες',
  },
  {
    id: 5,
    name: 'Burgers',
  },
  {
    id: 6,
    name: 'Ψητά',
  },
  {
    id: 7,
    name: 'Ιταλική',
  },
];
