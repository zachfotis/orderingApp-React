import { AiFillStar } from 'react-icons/ai';
import { MdArrowBackIosNew } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { Store } from '../../types';
import { baseURL } from '../../utilities/server';
import DealsIcon from '../../assets/icons/deals.png';
import Starred from '../Starred';

function Header({ store, isDeal }: { store: Store; isDeal: boolean }) {
  const navigate = useNavigate();

  return (
    <div className="relative w-full">
      <img
        src={baseURL + store.images.cover}
        alt={store.title}
        className="w-full h-[300px] object-cover rounded-t-md"
      />
      <MdArrowBackIosNew
        className="absolute top-5 left-5 z-10 text-3xl text-black bg-white rounded-full p-2 cursor-pointer"
        onClick={() => {
          navigate('/home');
        }}
      />
      {isDeal && <img src={DealsIcon} alt="deals" className="absolute top-[57%] right-[15px] z-10 w-[50px] h-[50px]" />}
      <div className="absolute top-[10px] right-[25px] z-10">
        <Starred isStarred={false} />
      </div>
      <div className="w-full bg-white flex justify-start items-center p-5 gap-5">
        <img
          src={baseURL + store.images.logo}
          alt="banner"
          loading="lazy"
          className="h-[70px] rounded-full border border-greyLight bg-white p-2"
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
