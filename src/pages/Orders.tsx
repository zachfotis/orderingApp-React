import { format } from 'date-fns';
import { el } from 'date-fns/esm/locale';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { BsFillBasket2Fill } from 'react-icons/bs';
import { FaReceipt, FaUserSecret } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import CartIcon from '../assets/icons/empty-cart.png';
import OrderIcon from '../assets/icons/order.png';
import Loader from '../components/Loader';
import { useDeliveryContext } from '../context/DeliveryContext';
import { useFirebaseContext } from '../context/FirebaseContext';
import { Order } from '../types';
import { baseURL } from '../utilities/server';

function Orders() {
  const { user, isNormalAccount } = useFirebaseContext();
  const { stores, basketDispatch, setShowBasket } = useDeliveryContext();
  const [orders, setOrders] = useState<[Order] | []>([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getOrders = async () => {
      setIsLoading(true);
      const response = await fetch(baseURL + '/api/orders', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      });

      const data = await response.json();

      if (data.success) {
        const orders: [Order] = data.data;
        setOrders(orders);
      }
      setIsLoading(false);
    };

    if (user?.accessToken) {
      getOrders();
    }
  }, [user]);

  const handleAddToBasket = (order: Order) => {
    const store = stores.find((store) => store._id === order.storeID);

    // Check if store is valid
    if (!store) {
      return;
    }

    // Clear basket
    basketDispatch({ type: 'CLEAR_BASKET' });

    // Add items to basket
    order.order.forEach((item) => {
      basketDispatch({
        type: 'ADD_ITEM',
        payload: {
          store: store,
          selectedItem: item,
        },
      });
    });

    // Close basket to open when navigating to store and see animation
    setShowBasket(false);

    // Navigate to store and open cart
    const state = {
      isCartOpen: true,
    };

    navigate('/store/' + order.storeID, { state });
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      exit={{ opacity: 0 }}
      className="relative w-full mx-auto max-w-[700px] p-5 min-h-[calc(100vh-64px)] md:min-h-[calc(100vh-80px)] flex flex-col justify-start items-center overflow-hidden"
    >
      {!isNormalAccount ? (
        <div className="flex-1 flex flex-col justify-center items-center gap-7 p-5">
          <div className="bg-gray-100 p-7 rounded-full">
            <FaUserSecret className="text-6xl text-gray-500" />
          </div>
          <div className="flex flex-col justify-center items-center gap-3">
            <h1 className="text-2xl font-[600]">Δεν έχεις συνδεθεί</h1>
            <p className="text-center text-xs">Πρέπει να συνδεθείς για να δεις τις παραγγελίες σου.</p>
          </div>
        </div>
      ) : orders.length > 0 ? (
        <>
          <div className="flex flex-col justify-start items-center my-5 gap-3">
            <img src={OrderIcon} alt="order logo" className="w-[50px] md:w-[70px]" />
            <h1 className="text-xl md:text-2xl">Οι Παραγγελίες σου</h1>
          </div>
          <div className="w-full mt-5 flex flex-col justify-start items-start gap-10">
            {orders.map((order) => (
              <div
                key={order._id}
                className="flex-1 mx-auto w-full h-full overflow-y-auto shadow-md rounded-lg p-5
                hover:outline-dashed hover:outline-2 hover:outline-greyLight hover:scale-[102%] hover:shadow-lg
                transition-transform duration-300 ease-in-out"
              >
                {/* Order Store */}
                <div className="w-full flex justify-start items-center gap-5 mb-5 pr-3">
                  <img
                    src={baseURL + '/' + stores.find((store) => store._id === order.storeID)?.images?.logo}
                    alt="logo"
                    className="w-[40px] h-auto"
                  />
                  <div className="flex flex-col justify-start items-start gap-1">
                    <h1 className="font-[500] text-base">
                      {stores.find((store) => store._id === order.storeID)?.title}
                    </h1>
                    <h1 className="font-[400] text-xs text-greyDark">
                      {format(new Date(order.createdAt), 'LLL d, yyyy - HH:mm', { locale: el })}
                    </h1>
                  </div>
                  <button
                    className="ml-auto flex flex-col justify-start items-center gap-1 cursor-pointer"
                    onClick={() => {
                      handleAddToBasket(order);
                    }}
                  >
                    <img src={CartIcon} alt="Cart" className="w-[25px]" />
                    <p className="font-[500] text-xs text-greyDark">Θέλω Ξανά</p>
                  </button>
                </div>
                {/* Order Items */}
                {order.order.length > 0 && (
                  <div className="flex flex-col justify-start items-start gap-3">
                    {order.order.map((item, index) => (
                      <div
                        key={item.itemName + index}
                        className="w-full flex flex-col justify-center items-start gap-5 p-3 shadow-sm rounded-lg bg-white"
                      >
                        <div className="w-full flex justify-between items-center gap-3">
                          <p className="text-sm text-greyDark font-[500]">{item.quantity}</p>
                          <p className="w-full text-sm text-greyDark font-[400] text-start">{item.itemName}</p>
                          <p className="text-sm text-greyDark font-[400]">
                            {(item.itemPrice * item.quantity).toFixed(2)}€
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {/* Order Total */}
                <div className="w-full flex flex-col justify-center items-start gap-5 p-3 shadow-sm rounded-lg bg-white mt-5">
                  <div className="w-full flex justify-between items-center gap-3">
                    <div className="w-full flex justify-start items-center gap-2">
                      <FaReceipt />
                      <p className="text-sm text-greyDark font-[500]">Σύνολο Παραγγελίας</p>
                    </div>
                    <p className="text-sm text-greyDark font-[500]">{order.orderTotal.toFixed(2)}€</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : isLoading ? (
        <Loader />
      ) : (
        <div className="flex-1 flex flex-col justify-center items-center gap-7 p-5">
          <div className="bg-gray-100 p-7 rounded-full">
            <BsFillBasket2Fill className="text-6xl text-gray-500" />
          </div>
          <div className="flex flex-col justify-center items-center gap-3">
            <h1 className="text-2xl font-[600]">Δεν υπάρχουν Παραγγελίες</h1>
            <p className="text-center text-xs">
              Παρακαλώ προσθέστε προϊόντα στο καλάθι σας και πατήστε το κουμπί &quot;Ολοκλήρωση Παραγγελίας&quot; για να
              πραγματοποιήσετε μια παραγγελία.
            </p>
          </div>
        </div>
      )}
    </motion.section>
  );
}
export default Orders;
