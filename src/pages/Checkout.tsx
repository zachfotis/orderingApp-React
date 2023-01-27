import { motion } from 'framer-motion';
import CheckoutBasket from '../components/checkout/CheckoutBasket';
import CheckoutButton from '../components/checkout/CheckoutButton';
import CheckoutOrder from '../components/checkout/CheckoutOrder';
import EmptyBasket from '../components/checkout/EmptyBasket';
import { useDeliveryContext } from '../context/DeliveryContext';

function Checkout() {
  const { basketState } = useDeliveryContext();

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      exit={{ opacity: 0 }}
      className="w-full min-h-[calc(100vh-64px)] md:min-h-[calc(100vh-80px)] flex flex-col justify-start items-center overflow-hidden"
    >
      {basketState && basketState.totalItems.length > 0 ? (
        <div className="w-full flex flex-col md:flex-row justify-center items-center md:items-start md:gap-10 md:mb-28 mb-16">
          <CheckoutOrder />
          <CheckoutBasket />
          <div className="fixed bottom-0 left-0 w-full p-2 bg-slate-50 flex justify-center items-center">
            <CheckoutButton />
          </div>
        </div>
      ) : (
        <EmptyBasket />
      )}
    </motion.section>
  );
}
export default Checkout;
