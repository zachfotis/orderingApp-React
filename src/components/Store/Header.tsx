import { AiFillStar } from 'react-icons/ai';
import { Store } from '../../types';
import { baseURL } from '../../utilities/server';

function Header({ store }: { store: Store }) {
  return (
    <div className="w-full">
      <img src={baseURL + store.images.cover} alt={store.title} className="w-full h-[300px] object-cover rounded-md" />
      <div className="w-full bg-white flex justify-start items-center p-5 gap-5">
        <img
          src={store.images.logo}
          alt="banner"
          loading="lazy"
          className="h-[70px] rounded-full border border-greyLight bg-white"
        />
        <div className="w-full flex flex-col justify-center items-start gap-1">
          <h1 className="font-[500] text-2xl">{store.title}</h1>
          <div className="flex justify-start items-center gap-2">
            <div className="flex justify-start items-center gap-1 text-sm">
              <AiFillStar className="text-yellow" />
              <h1 className="font-[500] text-yellowHover">{store.ratings.average.toFixed(1)}</h1>
              <h1 className="text-greyLight">({store.ratings.total})</h1>
            </div>
            <h1 className="text-sm text-greyLight">
              {store.categories[0]} | {store.info.deliveryTime}&apos; | Ελάχιστη {store.info.minimumOrder.toFixed(2)}€
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Header;
