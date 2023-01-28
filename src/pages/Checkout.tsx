import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import CheckoutBasket from '../components/checkout/CheckoutBasket';
import CheckoutButton from '../components/checkout/CheckoutButton';
import CheckoutOrder from '../components/checkout/CheckoutOrder';
import EmptyBasket from '../components/checkout/EmptyBasket';
import OrderCompleted from '../components/checkout/OrderCompleted';
import { useDeliveryContext } from '../context/DeliveryContext';

type OrderResponseData = {
  orderTotal: number;
  estimatedDeliveryTime: number;
};

function Checkout() {
  const { basketState } = useDeliveryContext();
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [orderResponseData, setOrderResponseData] = useState<OrderResponseData>({
    orderTotal: 0,
    estimatedDeliveryTime: 0,
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      exit={{ opacity: 0 }}
      className="relative w-full min-h-[calc(100vh-64px)] md:min-h-[calc(100vh-80px)] flex flex-col justify-start items-center overflow-hidden"
    >
      {basketState && basketState.totalItems.length > 0 ? (
        <div className="w-full max-w-[1280px] flex flex-col md:flex-row justify-center items-center md:items-start md:gap-10 md:mb-28 mb-16">
          <CheckoutOrder />
          <CheckoutBasket />
          <div className="fixed bottom-0 left-0 w-full p-2 bg-slate-50 flex justify-center items-center">
            <CheckoutButton setIsOrderPlaced={setIsOrderPlaced} setOrderResponseData={setOrderResponseData} />
          </div>
        </div>
      ) : !isOrderPlaced ? (
        <EmptyBasket />
      ) : (
        <OrderCompleted orderResponseData={orderResponseData} />
      )}
    </motion.section>
  );
}
export default Checkout;
