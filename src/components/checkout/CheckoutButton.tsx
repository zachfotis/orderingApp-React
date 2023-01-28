import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { useDeliveryContext } from '../../context/DeliveryContext';
import { useFirebaseContext } from '../../context/FirebaseContext';
import { BasketSelectedItem } from '../../types';
import { baseURL } from '../../utilities/server';

interface CheckoutButtonProps {
  setIsOrderPlaced: React.Dispatch<React.SetStateAction<boolean>>;
  setOrderResponseData: React.Dispatch<React.SetStateAction<{ orderTotal: number; estimatedDeliveryTime: number }>>;
}

function CheckoutButton({ setIsOrderPlaced, setOrderResponseData }: CheckoutButtonProps) {
  const { basketState, readyToSubmit, basketDispatch } = useDeliveryContext();
  const { user } = useFirebaseContext();

  const basketQuantity = (basketState.totalItems as BasketSelectedItem[]).reduce((acc, item) => acc + item.quantity, 0);
  const basketTotal = (basketState.totalItems as BasketSelectedItem[]).reduce(
    (acc, item) => acc + item.itemPrice * item.quantity,
    0,
  );

  const placeOrder = async () => {
    if (!readyToSubmit) return;

    const order = {
      storeID: basketState.store?._id,
      order: basketState.totalItems,
      user,
    };

    try {
      const res = await fetch(baseURL + '/api/placeOrder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(order),
      });

      const data = await res.json();

      if (data.success) {
        setIsOrderPlaced(true);
        setOrderResponseData(data.data);
        basketDispatch({ type: 'CLEAR_BASKET' });
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error('Παρουσιάστηκε κάποιο πρόβλημα. Παρακαλώ προσπαθήστε ξανά.');
    }
  };

  return (
    <motion.button
      className="w-full md:w-[400px] bg-yellow text-black py-3 px-5 rounded-lg font-[500] text-base hover:bg-yellowHover flex justify-between items-center
      disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-greyLight disabled:text-greyDark
      "
      initial={{ opacity: 0, y: '100%' }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: '100%' }}
      transition={{ duration: 0.3 }}
      disabled={!readyToSubmit}
      onClick={placeOrder}
    >
      <p className="px-2 py-1 rounded-lg bg-slate-50">{basketQuantity}</p>
      <p>Αποστολή Παραγγελίας</p>
      <p>{basketTotal.toFixed(2)}€</p>
    </motion.button>
  );
}
export default CheckoutButton;
