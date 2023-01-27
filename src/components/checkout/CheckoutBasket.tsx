import { BsFillBasket2Fill } from 'react-icons/bs';
import { useDeliveryContext } from '../../context/DeliveryContext';
import BasketTotal from './BasketTotal';
import CheckoutItems from './CheckoutItems';

function CheckoutBasket() {
  const { basketState } = useDeliveryContext();
  return (
    <div className="w-full max-w-[600px] bg-slate-50 flex flex-col justify-between items-center gap-7 p-5 md:mt-10 rounded-lg">
      {/* Top Part */}
      <div className="w-full flex flex-col justify-start items-start gap-2">
        <h1 className="text-2xl font-[500]">Καλάθι</h1>
        <div className="flex justify-start items-center gap-2">
          <BsFillBasket2Fill className="text-sm text-gray-500" />
          <p className="text-xs font-[400]">
            Delivery από
            <span className="font-[500]"> {basketState?.store?.title}</span>
          </p>
        </div>
      </div>
      <CheckoutItems />
      <BasketTotal />
    </div>
  );
}
export default CheckoutBasket;
