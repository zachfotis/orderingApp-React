import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CheckIcon from '../../assets/icons/check.png';
import DeliveryIcon from '../../assets/icons/delivery.png';

interface OrderCompletedProps {
  orderResponseData: { orderTotal: number; estimatedDeliveryTime: number };
}

function OrderCompleted({ orderResponseData }: OrderCompletedProps) {
  const [timer, setTimer] = useState(orderResponseData.estimatedDeliveryTime);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
      className="flex-1 h-full w-full flex flex-col justify-center items-center gap-10 bg-slate-50 text-greyDark text-2xl px-5"
    >
      <div
        className="relative w-[300px] md:w-[350px] h-[300px] md:h-[350px] rounded-full transition duration-500 ease-in-out shadow-lg"
        style={{
          background: `conic-gradient(rgb(0, 188, 139) ${
            (timer / orderResponseData.estimatedDeliveryTime) * 360
          }deg, #e2e8f0 0deg)`,
        }}
      >
        <div
          className="absolute top-1/2 left-1/2 w-[90%] h-[90%] bg-slate-50 rounded-full 
          transform -translate-x-1/2 -translate-y-1/2 flex justify-center items-center shadow-inner"
        >
          {timer > 0 ? (
            <div className="flex flex-col justify-center items-center gap-3">
              <p className="text-2xl">Παράδοση σε</p>
              <p className="text-6xl font-[500]">{timer}</p>
              <p className="text-2xl">{timer === 1 ? 'λεπτό' : 'λεπτά'}</p>
            </div>
          ) : (
            <div className="relative flex flex-col justify-center items-center gap-5 px-5">
              <img src={DeliveryIcon} alt="delivery completed" className="w-[120px] md:w-[150px]" />
              <img
                src={CheckIcon}
                alt="delivery completed"
                className="w-[30px] md:w-[50px] absolute top-[-10px] right-[10px]"
              />
            </div>
          )}
        </div>
      </div>
      <p className="text-xl font-[400] text-center">
        {timer > 0 ? 'Η παραγγελία σου ολοκληρώθηκε επιτυχώς!' : 'Η παραγγελία σου μόλις παραδόθηκε!'}
      </p>
      <button
        className="bg-yellow text-black py-3 px-5 mt-5 rounded-lg font-[500] text-base 
      hover:bg-yellowHover flex justify-between items-center"
        onClick={() => navigate('/home')}
      >
        Επιστροφή στην αρχική
      </button>
    </motion.div>
  );
}
export default OrderCompleted;
