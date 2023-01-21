import { AiFillStar } from 'react-icons/ai';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { baseURL } from '../../utilities/server';
import DealsIcon from '../../assets/icons/deals.png';

import { Store } from '../../types';

function StoreItem({ store, dealsCatalog }: { store: Store; dealsCatalog: string[] }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      whileHover={{ scale: 1.03 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="relative min-w-full xl:min-w-[380px] xl:max-w-[380px] h-[290px] flex flex-col justify-start items-start overflow-hidden rounded-lg shadow-lg cursor-pointer"
    >
      <Link to={`/store/${store._id}`} className="w-full">
        <div className="w-full h-[200px]">
          <img
            src={baseURL + '/' + store.images.thumb}
            alt="banner"
            loading="lazy"
            className="w-full h-full object-cover"
          />
          <motion.img
            src={baseURL + '/' + store.images.logo}
            alt="banner"
            loading="lazy"
            className="absolute top-[58%] left-[15px] z-10 w-[40px] h-[40px] rounded-full border border-greyLight bg-white p-1"
            whileHover={{ scale: 1.3 }}
            transition={{ duration: 0.3 }}
          />
          {dealsCatalog?.includes(store._id) && (
            <img src={DealsIcon} alt="deals" className="absolute top-[50%] right-[10px] z-10 w-[40px] h-[40px]" />
          )}
        </div>
        <div className="w-full h-[100px] p-5 bg-white flex justify-between items-center rounded-t-lg absolute top-[190px] ">
          <div className="flex flex-col justify-start items-start gap-0">
            <h1 className="font-[500] text-base">{store.title}</h1>
            <h1 className="text-sm text-greyLight">
              {store.categories[0]} | {store.info.deliveryTime}&apos; | Ελάχιστη {store.info.minimumOrder.toFixed(2)}€
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
      </Link>
    </motion.div>
  );
}
export default StoreItem;
