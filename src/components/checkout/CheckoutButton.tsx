import { motion } from 'framer-motion';
import { useDeliveryContext } from '../../context/DeliveryContext';
import { BasketSelectedItem } from '../../types';

function CheckoutButton() {
  const { basketState, readyToSubmit } = useDeliveryContext();

  const basketQuantity = (basketState.totalItems as BasketSelectedItem[]).reduce((acc, item) => acc + item.quantity, 0);
  const basketTotal = (basketState.totalItems as BasketSelectedItem[]).reduce(
    (acc, item) => acc + item.itemPrice * item.quantity,
    0,
  );

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
    >
      <p className="px-2 py-1 rounded-lg bg-slate-50">{basketQuantity}</p>
      <p>Αποστολή Παραγγελίας</p>
      <p>{basketTotal.toFixed(2)}€</p>
    </motion.button>
  );
}
export default CheckoutButton;
