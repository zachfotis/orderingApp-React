import { useEffect, useState } from 'react';
import LoaderSmall from '../LoaderSmall';
import StoreItem from './StoreItem';

type Store = {
  _id: string;
  title: string;
  categories: string[];
  info: {
    deliveryTime: number;
    minimumOrder: number;
  };
  ratings: {
    average: number;
    total: number;
  };
  images: {
    logo: string;
    cover: string;
  };
};

function Stores() {
  const [isLoading, setIsLoading] = useState(false);
  const [stores, setStores] = useState<Store[]>([]);

  useEffect(() => {
    const getStores = async () => {
      setIsLoading(true);
      const response = await fetch('http://localhost:3001/api/stores');
      const data = await response.json();

      // replace image urls with unsplash random images
      // data.forEach((store: Store) => {
      //   const category = `${getRandomImage(store.categories[0])},food`;
      //   store.images.cover = `https://source.unsplash.com/random/400x200?${category}&sig=${Math.floor(
      //     Math.random() * 1000,
      //   )}`;
      // });

      setStores(data);
      setIsLoading(false);
    };

    getStores();
  }, []);

  return isLoading ? (
    <LoaderSmall />
  ) : (
    <div className="w-full max-w-[1280px] flex flex-col p-5 justify-start items-start gap-5">
      <h1>{stores?.length > 0 ? stores.length : 0} καταστήματα</h1>
      <div className="w-full flex justify-between items-start flex-wrap gap-10">
        {stores?.map((store) => (
          <StoreItem key={store._id} store={store} />
        ))}
      </div>
    </div>
  );
}
export default Stores;

const getRandomImage = (category: string) => {
  switch (category) {
    case 'Σουβλάκια':
      return 'meat';
    case 'Pizza':
      return 'pizza';
    case 'Ψητά - Grill':
      return 'grill';
    case 'Burgers':
      return 'burgers';
    case 'Ζυμαρικά':
      return 'pasta';
    case 'Κρέπες':
      return 'crepa';
    case 'Καφέδες':
      return 'coffee';
    default:
      return 'food';
  }
};
