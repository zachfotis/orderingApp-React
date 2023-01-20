import { BsFillBasket2Fill } from 'react-icons/bs';
import RibbonIcon from '../assets/icons/ribbon.png';
import CartIcon from '../assets/icons/empty-cart.png';

interface BasketProps {
  showBasket: boolean;
  setShowBasket: (showBasket: boolean) => void;
}

function Basket({ showBasket, setShowBasket }: BasketProps) {
  const toggleBasket = () => setShowBasket(!showBasket);

  return (
    <div
      className={`flex bg-slate-50 shadow-lg z-10 transition-all duration-1000 ease-in-out
      fixed top-0 pt-[64px] md:pt-0 md:top-[80px] right-0 w-full md:w-[400px] h-screen md:h-[calc(100vh-80px)] border-l border-l-1 border-l-slate-200
      ${showBasket ? 'translate-x-0' : 'translate-x-[99%] md:translate-x-[95%]'}
    `}
    >
      <button
        onClick={toggleBasket}
        className={`absolute top-[50%] left-0
        transform transition-all duration-200 ease-in-out
        md:-translate-y-1/2 md:-translate-x-1/2 md:hover:-translate-x-[60%] 
        ${showBasket ? 'translate-x-[-25%] hover:translate-x-0' : '-translate-x-1/2 hover:-translate-x-[60%]'}
        
        `}
      >
        <img src={RibbonIcon} alt="ribbon" className="w-[60px] h-[70px] left-0" />
        <img
          src={CartIcon}
          alt="Cart"
          className="absolute top-[50%] left-[50%] transform -translate-y-1/2 -translate-x-1/2
         w-[25px] h-[25px] cursor-pointer"
        />
      </button>
      {/* Empty Cart */}
      <div className="flex-1 flex flex-col justify-center items-center gap-7 p-5">
        <div className="bg-gray-100 p-7 rounded-full">
          <BsFillBasket2Fill className="text-6xl text-gray-500" />
        </div>
        <div className="flex flex-col justify-center items-center gap-3">
          <h1 className="text-2xl font-[600]">Άδειο Καλάθι</h1>
          <p className="text-center text-xs">Προσθέστε προϊόντα στο καλάθι για να ολοκληρώσετε την παραγγελία σας.</p>
        </div>
      </div>
    </div>
  );
}
export default Basket;
