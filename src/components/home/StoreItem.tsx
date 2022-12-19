import { AiFillStar } from 'react-icons/ai';
import { motion } from 'framer-motion';

interface StoreItemProps {
  store: {
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
}

function StoreItem({ store }: StoreItemProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.4 }}
      className="relative min-w-full xl:min-w-[380px] xl:max-w-[380px] h-[290px] flex flex-col justify-start items-start overflow-hidden rounded-lg shadow-lg cursor-pointer"
    >
      <div className="w-full h-[200px]">
        <img src={store.images.cover} alt="banner" loading="lazy" className="w-full h-full object-cover" />
      </div>
      <div className="w-full h-[100px] p-5 bg-white flex justify-between items-center rounded-t-lg absolute top-[190px] ">
        <div className="flex flex-col justify-start items-start gap-0">
          <h1 className="font-[500] text-base">{store.title}</h1>
          <h1 className="text-sm text-greyLight">
            {store.categories[0]} | {store.info.deliveryTime}&apos; | Ελάχιστη {store.info.minimumOrder}€
          </h1>
        </div>
        <div className="flex flex-col justify-start items-end">
          <div className="flex justify-start items-center gap-1">
            <AiFillStar className="text-xl text-yellow" />
            <h1 className="font-[500] text-yellowHover text-xl">{store.ratings.average.toFixed(1)}</h1>
          </div>
          <h1 className="text-sm text-greyLight">({store.ratings.total})</h1>
        </div>
      </div>
    </motion.div>
  );
}
export default StoreItem;
