import { useDeliveryContext } from '../../context/DeliveryContext';
import { BasketSelectedItem } from '../../types';
import { FaReceipt } from 'react-icons/fa';

function BasketTotal() {
  const { basketState } = useDeliveryContext();
  const basketTotal = (basketState.totalItems as BasketSelectedItem[]).reduce(
    (acc, item) => acc + item.itemPrice * item.quantity,
    0,
  );

  return (
    <div className="w-full flex flex-col justify-center items-start gap-5 p-3 shadow-sm rounded-lg bg-white mt-5">
      <div className="w-full flex justify-between items-center gap-3">
        <div className="w-full flex justify-start items-center gap-2">
          <FaReceipt />
          <p className="text-sm text-greyDark font-[500]">Σύνολο Πληρωμής</p>
        </div>
        <p className="text-sm text-greyDark font-[500]">{basketTotal.toFixed(2)}€</p>
      </div>
    </div>
  );
}
export default BasketTotal;
