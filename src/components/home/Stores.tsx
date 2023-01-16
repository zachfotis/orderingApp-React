import { useEffect, useState } from 'react';
import { useDeliveryContext } from '../../context/DeliveryContext';
import LoaderSmall from '../LoaderSmall';
import StoreItem from './StoreItem';

import { Store, Category } from '../../types';

function Stores({ categories, dealsCatalog }: { categories: Category[]; dealsCatalog: string[] }) {
  const [isLoading, setIsLoading] = useState(false);
  const { stores } = useDeliveryContext();
  const [sortedStores, setSortedStores] = useState<Store[]>([]);

  useEffect(() => {
    setIsLoading(true);
    // get all selected categories
    const selectedCategories = categories.filter((category) => category.selected);

    // if no categories are selected, show all stores
    if (selectedCategories.length === 0) {
      setSortedStores(stores);
      setIsLoading(false);
      return;
    }

    // get all stores that have at least one of the selected categories
    const filteredStores = stores.filter((store) => {
      return store.categories.some((category) =>
        selectedCategories.some((selectedCategory) => selectedCategory.name === category),
      );
    });

    setSortedStores(filteredStores);
    setIsLoading(false);
  }, [stores, categories]);

  return isLoading ? (
    <LoaderSmall />
  ) : (
    <div className="w-full max-w-[1280px] flex flex-col p-5 justify-start items-start gap-5">
      <h1>
        {sortedStores?.length > 0 ? sortedStores.length : 0} {sortedStores?.length === 1 ? 'κατάστημα' : 'καταστήματα'}
      </h1>
      <div className="w-full flex justify-between items-start flex-wrap gap-10">
        {sortedStores?.map((store) => (
          <StoreItem key={store._id} store={store} dealsCatalog={dealsCatalog} />
        ))}
      </div>
    </div>
  );
}
export default Stores;
